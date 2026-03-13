\# Architecture Decisions



\## 1. How would you scale this to 100k users?



Use a microservice architecture where the API server is containerized and deployed behind a load balancer. The database can be migrated from SQLite to PostgreSQL with read replicas. Caching layers such as Redis can be added for frequently accessed insights.



\## 2. How would you reduce LLM cost?



Reduce calls by caching previous analysis results and storing them in the database. Use smaller models when possible and batch requests when analyzing multiple entries.



\## 3. How would you cache repeated analysis?



Hash the journal text and store the hash in Redis. If the same text is analyzed again, the system returns the cached result instead of calling the LLM.



\## 4. How would you protect sensitive journal data?



Use HTTPS for all communication, encrypt sensitive fields in the database, implement authentication (JWT), and ensure strict access control so users can only access their own entries.

