FROM python:3.10.8-slim as python-base

# Copy files and directories to docker
COPY poetry.lock pyproject.toml package.json ./
COPY docs ./docs
COPY site ./site

# Install dependencies
RUN pip install poetry 
RUN poetry install --only main

# Copy changelog to docs
RUN cp CHANGELOG.md docs/source/changelog.md

# Build docs in the site directory
RUN poetry run sphinx-build -W -b dirhtml docs/source site

FROM nginx
COPY --from=python-base ./site /usr/share/nginx/html
