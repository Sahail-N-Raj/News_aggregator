### Running the Project in a Docker Container

To containerize and run the frontend application using Docker, follow these steps:

1. **Build the Docker image**:

   ```sh
   docker build -t sahail-news-aggregator .
   ```

2. **Run the Docker container**:

   ```sh
   docker run -p 5000:5000 sahail-news-aggregator
   ```

3. **Access the application**:
   Open your browser and navigate to `http://localhost:5000/news`.

Make sure Docker is installed and running on your machine before executing these commands.
