ssh -i C:\Users\siin\Dropbox\c_re@ds\epikemKey.pem -NL localhost:2374:/var/run/docker.sock docker@13.125.222.118 &

$env:DOCKER_HOST='localhost:2374'