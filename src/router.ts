// Generouted, changes to this file will be overriden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/dashboard`
  | `/mangadex`
  | `/mangadex/chapter/:id`
  | `/mangadex/download`
  | `/mangadex/group/:id`
  | `/mangadex/group/:id/feeds`
  | `/mangadex/group/:id/titles`
  | `/mangadex/group/search`
  | `/mangadex/manga/:id`
  | `/mangadex/manga/:id/covers`
  | `/mangadex/manga/:id/related`
  | `/mangadex/manga/random`
  | `/mangadex/titles/latest-updates`
  | `/mangadex/titles/recently-added`
  | `/mangadex/titles/recently-popular`
  | `/mangadex/titles/search`

export type Params = {
  '/mangadex/chapter/:id': { id: string }
  '/mangadex/group/:id': { id: string }
  '/mangadex/group/:id/feeds': { id: string }
  '/mangadex/group/:id/titles': { id: string }
  '/mangadex/manga/:id': { id: string }
  '/mangadex/manga/:id/covers': { id: string }
  '/mangadex/manga/:id/related': { id: string }
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
