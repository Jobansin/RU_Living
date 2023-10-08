# using this way because it is officially supported. See https://pip.pypa.io/en/stable/user_guide/#using-pip-from-your-program
import subprocess

packageList = ["beautifulsoup4", "requests"]
# beautiful soup 4 to work with html
# requests to work with http

def install():
        for package in packageList:
                try:
                        __import__(package)
                except ImportError:
                        subprocess.run(["python", "-m", "pip", "install", package])  
                        
                        
                        
#python -c 'import setup; setup.install()'