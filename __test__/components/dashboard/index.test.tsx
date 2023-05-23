import React from 'react'
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { describe, it } from 'node:test'
import Dashboard from '@/components/Dashboard'
import Track from '@/components/Track'
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET
});


describe('dashboard component', () => {
    it('should render properly', () => {

        render(<Dashboard/>)
        console.log('por aqui pase')
    })
})