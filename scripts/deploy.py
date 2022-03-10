import sys
import os
import json

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
        os.chdir(BASE_DIR+"/stays-platform")
        os.system("npm run deploy:"+env)
        os.chdir(BASE_DIR+"/stays-ui")
        os.system("npm run deploy:"+env)
