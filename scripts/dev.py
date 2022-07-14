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


def setUiCfg(env, platformEnv):
    cfgPath = BASE_DIR+"/stays-ui/config.json"
    cfg = ""
    with open(cfgPath, 'r') as f:
        cfg = json.load(f)
    with open(cfgPath, "w") as f:
        cfg['env'] = env
        cfg['platform']['env'] = platformEnv
        txt = json.dumps(cfg, indent=2) + EOF
        f.write(txt)


def runPlatform():
    os.chdir(BASE_DIR+"/stays-platform")
    os.system("npm run dev")


def runUi():
    os.chdir(BASE_DIR+"/stays-ui")
    os.system("npm run dev")


if __name__ == "__main__":
    print("Running STAYS in Developer Mode... \n\n")
    setPlatformCfg("dev")
    setUiCfg("dev", "local")
    t1 = threading.Thread(target=runPlatform)
    t2 = threading.Thread(target=runUi)
    t1.start()
    t2.start()
