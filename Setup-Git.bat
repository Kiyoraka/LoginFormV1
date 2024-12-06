@echo off
echo Checking Git installation and configuration...

:: Check if Git is installed
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Git is not installed! Please install Git first.
    echo Download Git from: https://git-scm.com/downloads
    pause
    exit /b 1
)

:: Check Git configuration
git config --global user.name >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Git username is not configured!
    set /p git_name="Enter your name for Git: "
    git config --global user.name "%git_name%"
)

git config --global user.email >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Git email is not configured!
    set /p git_email="Enter your email for Git: "
    git config --global user.email "%git_email%"
)

echo Setting up Git repository...

:: Create .gitignore file
echo # List of ignore folder and files > .gitignore
echo /[Tt]emp/ >> .gitignore
echo # List of ignore files >> .gitignore
echo *.exe >> .gitignore
echo *.txt >> .gitignore

:: Initialize git repository
git init

:: Create README.md
echo # PROJECT TITLE > README.md
echo. >> README.md
echo Software Version: [Version] >> README.md
echo. >> README.md
echo ## Description >> README.md
echo This software is used for... >> README.md

:: Remove cached files
git rm -r --cached .

:: Add all files respecting .gitignore
git add .

:: Initial commit
git commit -m "Initial commit"

:: Create main branch
git branch -M main

:: Prompt for GitHub repository URL
set /p repo_url="Enter your GitHub repository URL (e.g., https://github.com/username/repo.git): "

:: Test GitHub authentication
echo Testing GitHub authentication...
git ls-remote %repo_url% >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo GitHub authentication failed!
    echo Please make sure you have:
    echo 1. Created a GitHub account
    echo 2. Set up a Personal Access Token
    echo 3. When prompted, use your GitHub username and Personal Access Token as password
    pause
)

:: Add remote origin
git remote add origin %repo_url%

:: Push to GitHub
git push -u origin main

echo.
echo Repository setup complete!
echo Don't forget to update the README.md
pause