// Generouted, changes to this file will be overriden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/dashboard`
  | `/mangadex`
  | `/mangadex/chapter/:id`
  | `/mangadex/manga/:id`
  | `/mangadex/manga/:id/covers`
  | `/mangadex/manga/:id/related`
  | `/mangadex/manga/random`

export type Params = {
  '/mangadex/chapter/:id': { id: string }
  '/mangadex/manga/:id': { id: string }
  '/mangadex/manga/:id/covers': { id: string }
  '/mangadex/manga/:id/related': { id: string }
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
