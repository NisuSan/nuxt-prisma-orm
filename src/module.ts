import { defineNuxtModule, addServerHandler, createResolver } from '@nuxt/kit'
import fg from 'fast-glob'

// Module options TypeScript interface definition
export interface ModuleOptions {
  prismaPath?: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nuxtjs/prisma-orm',
    configKey: 'prismaOrm'
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const prismaSchema = resolve(options.prismaPath || './prisma/schema.prisma')
    const serverApiRoutes = resolve(options.prismaPath || '././nuxt/crud-gen/client')
    const apiComposable = resolve(options.prismaPath || './.nuxt/crud-gen/client/api.ts')

    if(!prismaSchema) {
      console.warn("Prisma shema not found. Module will not has effect to your app.");
      return;
    }

    const routes = await fg(`${serverApiRoutes}/.ts`)
    if(routes.length > 0) {
      for (const r of routes) {
        addServerHandler(await import(r))
      }
    }
    else {
      console.warn(`Generated routes not found in <${serverApiRoutes}> folder. Module will not has effect to your app.`);
      return;
    }
  }
})
