# Django server ping pong 


## this repo is a small django project for testing interaction between react app and django 

# description
 - Handle request and ping/pong calling with rest api request
 - handle post method b64 between view controller
 - save temporary state and save it to a array in base64 format
 - use a service to handle image manipulation
 - try celery and redis to handle queue task but this method is slower with only django 
 
# advice to improve performance

  - handle correctly django request setting and memory and multithreading (reduce Django Memory Consumption)
  - use cache (memcache for example) or other cache system for database, memory
  - use garbage collecting
  - re-try celery and redis good practice (i discover it with this project, todo use `--concurrency` parameter)
  - review `add_new_pixel_to_image` function to decrease complexity function (maybe binary search Algorithms or insertionSort, need to investigate )
  - increase memory of the server :)
  - avoid writing image to disk and keep only b64 file in memory (but it was mention to the assignment...)
  - use numpy instead PIL will manipulate easily image data 
  - reduce Memory Usage in general
  - switch mod_wsgi apache for memory Consumption(not sure)
  - increase django cache memory
  

# Results test

| pixels         | Times         |
| -------------  | ------------- |
| 5              | 00:00:14      |
| 10             | 00:00:38      |
| 28             | 00:02:61      |
| 56             | 00:13:08      |
| 128            | 02:53:95      |
| 256            | 17:00:15      |
| 512            | memoryLeak    |
| 1024           | memoryLeak    |
| 2048           | memoryLeak    |
| 4072           | memoryLeak    |

it seems we have a exponential time issue depending the number of pixels...
So it's confirms that we have a complexity issue with the pixel treatment



#trouble shooting
if you have a error regarding file not found change path to  `path = '../assets/img/'` to `path = './assets/img/'` in `views.py`, docker path problem...

### Installation process 
## with docker compose

```
#run image

sudo docker-compose build --no-cache
docker-compose up
docker-compose ps
sudo docker-compose stop

#delete generated images

docker images
docker rm $(docker ps -aq)
docker rmi 407502c9474a cc5014e36df3
docker volume rm $(docker volume ls -q)
```



## docker method
````
 #run image  

 docker build -t ismail/squaremind_back .
 docker images
 sudo docker run -p 8000:8000 -d ismail/squaremind_back
 docker logs cdfdcdea2897ff5159b963015230141d0d0efebbaffc01c47064bb88660ddbf7
 docker images
 docker ps

 #delete generated image
 docker stop cdfdcdea2897
 docker rm $(docker ps -aq)
 docker rmi 4a86e63f520f cc5014e36df3
 docker volume rm $(docker volume ls -q)

```

#restart
docker-compose up -d
