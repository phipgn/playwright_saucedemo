pipeline {
    agent any
    stages {
        stage('install dependencies') {
            steps {
                bat '''
                    npm install
                '''
            }
        }
        stage('install playwright') {
            steps {
                bat '''
                    npx playwright install
                '''
            }
        }
        stage('run tests') {
            steps {
                bat '''
                    npx playwright test
                '''
            }
        }
        stage('generate allure report') {
            steps {
                bat '''
                    npm run allureReport
                '''
            }
        }
    }
    post {
        always {
            archiveArtifacts(artifacts: 'allure-report/**')
        }
    }
}