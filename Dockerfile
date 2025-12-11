ARG NODE_IMAGE=docker.io/library/node:22-alpine
ARG WORKDIR=/app

FROM ${NODE_IMAGE} AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN ["corepack", "enable"]

FROM base AS deps
ARG WORKDIR
WORKDIR ${WORKDIR}
COPY ./pnpm-lock.yaml ./package.json ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store ["pnpm", "install", "--frozen-lockfile"]

FROM base AS db
ARG WORKDIR
WORKDIR ${WORKDIR}
COPY --from=deps ${WORKDIR}/node_modules ${WORKDIR}/node_modules
COPY . ${WORKDIR}/
RUN ["pnpm", "run", "db:migrate"]

FROM base AS build
ARG WORKDIR
WORKDIR ${WORKDIR}
COPY --from=deps ${WORKDIR}/node_modules ${WORKDIR}/node_modules
COPY . ${WORKDIR}/
RUN ["pnpm", "run", "build"]

FROM ${NODE_IMAGE}
ARG WORKDIR
WORKDIR ${WORKDIR}
COPY --from=deps ${WORKDIR}/node_modules ${WORKDIR}/node_modules
COPY --from=build ${WORKDIR}/dist ${WORKDIR}/dist
COPY --from=db ${WORKDIR}/local.db ${WORKDIR}/local.db
CMD ["node", "dist"]
