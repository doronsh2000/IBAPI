FROM centos:6.7

MAINTAINER Doron Shushan

COPY ./files/epel.repo //etc/yum.repos.d/epel.repo

COPY ./files/RPM-GPG-KEY-EPEL-6  /etc/pki/rpm-gpg/RPM-GPG-KEY-EPEL-6

RUN mkdir -p /IB_API/node-ib/  && yum install npm -y && yum install iputils -y 

WORKDIR /IB_API/node-ib

COPY ./ /IB_API/node-ib

RUN npm install


ENV REDIS_ENV=Development
ENV REDIS_IP=redis
ENV MONGO_IP=mongodb

#ENTRYPOINT ["node","/IB_API/node-ib/examples/reqHistData_5m.js"]
