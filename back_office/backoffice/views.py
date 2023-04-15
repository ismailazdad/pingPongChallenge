import base64
import os
import requests
from django.http import JsonResponse
from django.shortcuts import redirect
from django.views.decorators.csrf import csrf_exempt
import gc
# i tried to use celery to handle performance, but it's seems not :)
# from .tasks import add_new_pixel_to_image_task, save_white_image_task, save_image_task

from .service.save_and_process_image import SaveAndProcess
image_service = SaveAndProcess()

width = 0
height = 0
progression_val = 0
base64_string = 'defaultvalue'
granular = 5
generate_images = []
path = '../assets/img/'
image_name = 'myImg.png'


def index(request):
    global progression_val, width, height, base64_string, generate_images,path,image_name,granular
    url = "http://127.0.0.1:8000/ping"
    if 'init' in request.GET:
        progression_val = 0
        generate_images = []
    if 'width' in request.GET and 'height' in request.GET:
        width = int(request.GET['width'])
        height = int(request.GET['height'])
        granular = int(request.GET['granular'])
        for f in [ i for i in os.listdir(path) if i.endswith(".png") ]:
            os.remove(os.path.join(path, f))
    if progression_val == 0:
        # celery method slower than regular for adding new color pixel, call directly service...
        # image_path = save_white_image_task.delay('./assets/img/', width, height, 'myImg.png').get()
        image_path = image_service.save_white_image(path, width, height, image_name)
        with open(image_path, "rb") as fp:
            requests.post(url, {'file': base64.b64encode(fp.read()), 'image_path': image_path})
    return JsonResponse({'generate_images': generate_images})


@csrf_exempt
def progress_view(request):
    global progression_val, generate_images
    tmp_image = []
    if len(generate_images) > 0:
        tmp_image.append(generate_images[-1])
    return JsonResponse({'progression': progression_val, 'generate_images': tmp_image})


def manage_pixel(url, image_path, image_data):
    global progression_val, generate_images,granular
    with open(image_path, 'wb') as file_to_save:
        decoded_image_data = base64.decodebytes(image_data)
        file_to_save.write(decoded_image_data)
    # celery method slower than regular for adding new color pixel, call directly service...
    # progression = add_new_pixel_to_image_task.delay(image_path).get()
    progression = image_service.add_new_pixel_to_image(image_path)
    progression_val = progression
    if progression_val > 0 and progression_val % granular == 0:
        # celery method slower than regular for adding new color pixel, call directly service...
        # file_info = save_image_task.delay(image_path, progression_val).get()
        file_info = image_service.save_image(image_path, progression_val)
        if ''.join(file_info.keys()) not in [ ''.join(list(i.keys())) for i in generate_images]:
            generate_images.append(file_info)
    # gc.collect()
    return progression_val


@csrf_exempt
def ping(request):
    global progression_val, generate_images
    url = "http://127.0.0.1:8000/pong"
    image_path = request.POST['image_path']
    image_data = request.POST['file'].encode('utf-8')
    progression_val = manage_pixel(url, image_path, image_data)
    if progression_val >= 100:
        request.session['finish'] = 'true'
        return redirect('index')
    else:
        with open(image_path, "rb") as fp:
            requests.post(url, {'file': base64.b64encode(fp.read()), 'image_path': image_path})
    return JsonResponse({'progression': progression_val})


@csrf_exempt
def pong(request):
    global progression_val, generate_images
    url = "http://127.0.0.1:8000/ping"
    image_path = request.POST['image_path']
    image_data = request.POST['file'].encode('utf-8')
    progression_val = manage_pixel(url, image_path, image_data)
    if progression_val >= 100:
        request.session['finish'] = 'true'
        return redirect('index')
    else:
        with open(image_path, "rb") as fp:
            requests.post(url, {'file': base64.b64encode(fp.read()), 'image_path': image_path})
    return JsonResponse({'progression': progression_val})
