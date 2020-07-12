pipeline {

    agent any

    stages {

        stage('Build') {

            steps {

                sh "npm install"
                sh "npm start"

            }

        }

        stage('Test') {

            steps {

               echo "test is doing"

            }

        }

        stage('Deploy') {

            steps {

                echo "Deploy"

            }

        }

    }

}