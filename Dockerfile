# Use the official LocalStack image as the base image
FROM localstack/localstack:latest

# Set environment variables
# ENV SERVICES=s3,sqs,lambda # Modify based on the AWS services you need
# ENV DEFAULT_REGION=us-east-1
ENV EXTRA_CORS_ALLOWED_ORIGINS='*'
# Install any additional dependencies if needed
# For example, if you need to install Python for Lambda functions
# RUN pip install 

# Expose the necessary ports for LocalStack services
EXPOSE 4566 
EXPOSE 4510-4559

# Start LocalStack in the container
CMD ["localstack", "start", "-d"]
