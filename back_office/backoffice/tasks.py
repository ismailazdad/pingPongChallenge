from time import sleep
from celery import shared_task
from .service.save_and_process_image import SaveAndProcess

image_service = SaveAndProcess()


@shared_task(bind=True)
def add_new_pixel_to_image_task(self, image_path):
    sleep(0.1)
    progression = image_service.add_new_pixel_to_image(image_path)
    return progression


@shared_task(bind=True)
def save_white_image_task(self, image_path, width, height, name):
    path = image_service.save_white_image(image_path, width, height, name)
    return path


@shared_task(bind=True)
def save_image_task(self, image_path, name):
    file_info = image_service.save_image(image_path, name)
    return file_info
