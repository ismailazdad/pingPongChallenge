#FROM python:3.8
#ENV PYTHONUNBUFFERED 1
#RUN mkdir /back_office
#WORKDIR /back_office
#COPY requirements.txt /back_office/
#RUN apt-get update && \
#  apt-get install -y apt-utils
#RUN apt-get install -y apt-transport-https
#RUN python -m pip install -r requirements.txt
#COPY . /back_office/


FROM python:3.8
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/
