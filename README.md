<picture>
 <source media="(prefers-color-scheme: dark)" srcset="https://static.vecteezy.com/system/resources/previews/014/013/233/original/car-rental-illustration-logo-design-vector.jpg">
 <source media="(prefers-color-scheme: light)" srcset="https://static.vecteezy.com/system/resources/previews/014/013/233/original/car-rental-illustration-logo-design-vector.jpg">
 <img alt="YOUR-ALT-TEXT" width="100" src="https://static.vecteezy.com/system/resources/previews/014/013/233/original/car-rental-illustration-logo-design-vector.jpg" >
</picture> 
<h1>Car Rental</h1>
<h2>Links:</h2>
- Figma: https://www.figma.com/design/0XoqcNG5A7wpnHiDC8TuSC/Projekt_Allgemeine-Verwaltung?node-id=0-1&t=97yjL4B3DyEHbMxo-0
- Google Docs: https://drive.google.com/drive/u/0/folders/1xg7LR6c9PpoOfn0XcqUVmC3eqxHQPO7T?ths=true
<h2> ... explain what it is about ...</h2>





















<h1>Setup</h1>
<h2>WSL</h2>
  <h3>Install WSL and Ubuntu under Windows</h3>
    <code>wsl --install</code>
  <h3>Install Python3</h3>
    <p>We will use python 3.10 as example. Start with opening up your ubuntu terminal.</p>
    <p>1. First, install the libraries and dependencies necessary to build Python:</p>
      <pre><code>sudo apt update</code></pre>
      <pre><code>sudo apt install build-essential zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libreadline-dev libffi-dev libsqlite3-dev wget libbz2-dev</code></pre>
    <p>2. Download the latest release’s source code from the Python download page using the wget command</p>
        <pre><code>wget https://www.python.org/ftp/python/3.11.3/Python-3.11.3.tgz</code></pre> 
    <p>3. Once the download is finished, extract the archive</p>
        <pre><code>tar -xf Python-3.11.3.tgz</code></pre>
    <p>4. Navigate to the Python source directory and run the configure command. This script performs a number of checks to make sure all of the dependencies are present on your system</p>  
      <pre><code>cd Python-3.11.3</code></pre>
      <pre><code>./configure --enable-optimizations</code></pre>
    <p>5. Start the build process</p>
      <pre><code>make -j 12</code></pre>
    <p>6. When the build process is complete, install the Python binaries by typing</p>
      <pre><code>sudo make altinstall</code></pre>
      <p>That’s it. The latest Python has been installed on your system and is ready to be used by executing python3.11. To verify it, type:</p>
      <pre><code>python3 --version</code></pre>
<h2>Install git</h2>
  <p>1. Open a terminal and we use the apt package management tools to update your local package index. </p>
      <pre><code>sudo apt update</code></pre>
  <p>2. With the update complete, we can install Git</p>
      <pre><code>sudo apt install git</code></pre>
  <p>We can confirm the version with the command</p>
      <pre><code>git --version</code></pre>
<h2>Download Project and Start it</h2>
  <p>First switch to a folder you want to download the project to. From their we want to clone the latest Version</p>
    <pre><code>git clone https://github.com/MultiKnacker/Projekt-WIN.git</code></pre>
  <p>Then we will go into the folder</p>
    <pre><code>cd .../Projekt-WIN</code></pre>
  <p>After we will start the python virtual env. This is used to manage the dependecies.</p>
    <pre><code># In cmd.exe
venv\Scripts\activate.bat
# In PowerShell
venv\Scripts\Activate.ps1</code></pre>
    <p>Lets start the Project. It can be inspected on http://www.localhost:5000</p>
    <pre><code>python3 app.py</code></pre>
















      
