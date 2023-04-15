# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## this repo is a small react project for testing interaction between react and django 

 - form management
 - fetch multiple url with progression
 - show image in canvas with timer with temporary treat image 
 - improve callback update to the server to avoid useless calling because of performance issue
 - add history select box that summarize the pixel advancement 

### Installation process
 
# use env to manage contact api point url 

```
#run container 
sudo docker-compose build --no-cache
docker-compose up
docker-compose ps

#stop container 
sudo docker-compose stop
docker images

#remove container
docker rm $(docker ps -aq)

#id below is the container id result from docker images command  
docker rmi 407502c9474a cc5014e36df3
docker volume rm $(docker volume ls -q)
```



## other method
````
 docker build -t ismail/squaremind_front .
 docker images
 sudo docker run -p 3000:3000 -d ismail/squaremind_front
 docker logs cdfdcdea2897ff5159b963015230141d0d0efebbaffc01c47064bb88660ddbf7
 docker images
 docker ps
 docker stop cdfdcdea2897
 docker rm $(docker ps -aq)
 docker rmi 4a86e63f520f cc5014e36df3
 docker volume rm $(docker volume ls -q)

```


#restart
docker-compose up -d


