#!/bin/bash

touch ~/.bashrc
echo "alias ll='ls -ltra'" >> ~/.bashrc
. ~/.bashrc

mysql -uroot -proot < /mysql/structure.sql
#mysql -uroot -proot < data.sql
