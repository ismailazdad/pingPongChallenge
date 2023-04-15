import base64
import os
import random
from PIL import Image

# return a random white pixel in image
def get_random_white_pixel(img, row, col):
    while True:
        x = random.randint(0, row - 1)
        y = random.randint(0, col - 1)
        if img.getpixel((x, y)) == (255, 255, 255):  # white pixel is chosen as a point of interest (POI)
            break
    return x, y

# class service , here we make action related to image manipulation
# create white image , save periodic images, add new color pixel in image
class SaveAndProcess:

    # save image with path , name ,width , height param in white pixel
    @staticmethod
    def save_white_image(image_path, width, height, name):
        img = Image.new('RGB', (width, height), color=(255, 255, 255))
        img.save(image_path + name, "PNG")
        return image_path + name

    @staticmethod
    def save_image(image_path, step):
        # optimize this function
        # simple copy file and then encode b64 instead pil
        img = Image.open(image_path)
        image_path2 = os.path.dirname(os.path.abspath(image_path))
        image_path2 += "/" + str(image_path.split('/')[-1].split('.')[0]) + "_" + str(step) + ".png"
        img.save(image_path2, "PNG")
        file_name = os.path.basename(image_path2)
        with open(image_path2, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
        return {file_name: encoded_string}

    # old version but have to much complexity...
    @staticmethod
    def add_new_pixel_to_image_old(image_path):
        pil_img = Image.open(image_path)
        # get all pixels value from this images
        pix_vals = list(pil_img.getdata())
        image_size_w, image_size_h = pil_img.size
        white_pixels = []
        color_pixels = []
        # cross along the image w/h and test the color value
        # memo refacto to avoid n2 complexity
        for i in range(0, image_size_w):
            for j in range(0, image_size_h):
                pix_val = pil_img.getpixel((i, j))
                if pix_val != (255, 255, 255):
                    # add existing colors to list
                    color_pixels.append(pix_val)
                else:
                    # add coordinate of white pixels
                    white_pixels.append([i, j])
        covoring = len(color_pixels) * 100 // len(pix_vals)
        if covoring < 100:
            # choice a color not present in the image
            p = tuple(random.choice(white_pixels))
            new_colors = (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))
            while new_colors in color_pixels:
                new_colors = (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))
            # put new pixels with new colors to images
            pil_img.putpixel(p, new_colors)
            pil_img.save(image_path)
        # return the progression of colored pixels
        return covoring

    # we reduce complexity of the algorithme by using while method and random
    # beteween n + nlogn
    # numpy complexity decrease
    @staticmethod
    def add_new_pixel_to_image(image_path):
        pil_img = Image.open(image_path)
        image_size_w, image_size_h = pil_img.size
        # get all pixels value from this images
        pix_vals = list(pil_img.getdata())
        # complexity O(n)
        color_pixels = [i for i in pix_vals if i != (255, 255, 255)]
        # complexity O(n log n)
        coord = get_random_white_pixel(pil_img, image_size_w, image_size_h)

        # choice a color not present in the image
        new_colors = (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))
        while new_colors in color_pixels:
            new_colors = (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))
        color_pixels.append(new_colors)
        # put new pixels with new colors to images
        pil_img.putpixel(coord, new_colors)
        covoring = len(color_pixels) * 100 // len(pix_vals)
        pil_img.save(image_path)
        # return the progression of colored pixels
        return covoring
