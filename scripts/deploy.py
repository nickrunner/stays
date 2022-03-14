import sys
import os
import json
import threading

BASE_DIR = os.getcwd()+"/.."
EOF = ""


def setPlatformCfg(env):
    cfgPath = BASE_DIR+"/stays-platform/config.json"
    cfg = ""
    with open(cfgPath) as f:
        cfg = json.load(f)
    with open(cfgPath, "w") as f:
        cfg['env'] = env
        txt = json.dumps(cfg, indent=2) + EOF
        f.write(txt)


def setUiCfg(env):
    cfgPath = BASE_DIR+"/stays-ui/config.json"
    cfg = ""
    with open(cfgPath, 'r') as f:
        cfg = json.load(f)
    with open(cfgPath, "w") as f:
        cfg['env'] = env
        cfg['platform']['env'] = env
        txt = json.dumps(cfg, indent=2) + EOF
        f.write(txt)


def build():
    os.chdir(BASE_DIR)
    os.system("docker-compose build")


def tag(env, service):
    os.chdir(BASE_DIR)
    os.system("docker tag stays_"+service +
              " gcr.io/stays-"+env+"/stays-"+service)


def push(env, service):
    os.chdir(BASE_DIR)
    os.system("docker push gcr.io/stays-"+env+"/stays-"+service)


def deploy(env, service):
    os.chdir(BASE_DIR)
    os.system("gcloud run deploy stays-"+service +
              " --image gcr.io/stays-"+env+"/stays-"+service+" --project stays-"+env+" --region us-central1")


def fullDeploy(env, service):
    tag(env, service)
    push(env, service)
    deploy(env, service)


if __name__ == "__main__":
    if(len(sys.argv) < 1):
        print("Please specify environment")
        exit(-1)
    env = sys.argv[1]
    if env != "dev" and env != "prod":
        print("Invalid environment!")
        exit(-1)
    else:
        setPlatformCfg(env)
        setUiCfg(env)
        build()
        t1 = threading.Thread(target=fullDeploy, args=(env, "platform"))
        t2 = threading.Thread(target=fullDeploy, args=(env, "ui"))
        t1.start()
        t2.start()
