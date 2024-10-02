# Step 1: Build the app
FROM node:20-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Install dependencies using Yarn
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the rest of the app code
COPY . .

# Build the Next.js app
RUN yarn build

# Step 2: Run the app
FROM node:20-alpine AS runner

# Set the working directory inside the container
WORKDIR /app

# Copy only necessary files from the build stage
COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js app
CMD ["yarn", "start"]