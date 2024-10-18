import React, { useState, useEffect } from 'react'
import { Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DotPattern } from "@/components/ui/background"

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  const [metric, setMetric] = useState('tracks')
  const [time, setTime] = useState('short_term')
  const [activityName, setActivityName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [accessToken, setAccessToken] = useState('')
  const [refreshToken, setRefreshToken] = useState('')
  const [topItems, setTopItems] = useState([])

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('access_token')
    const refresh = urlParams.get('refresh_token')
    if (token) setAccessToken(token)
    if (refresh) setRefreshToken(refresh)
  }, [])

  const handleSpotifyLoginAndGenerate = async () => {
    if (!accessToken) {
      window.location.href = '/api/spotify?path=login'
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/spotify?path=get_top_items&access_token=${accessToken}&time_range=${time}&type=${metric}`)
      const data = await response.json()
      setTopItems(data.items)
      console.log(`Generated activity with Metric: ${metric}, Time: ${time}, Activity Name: ${activityName}`)
      console.log('Top items:', data.items)
    } catch (error) {
      console.error("Failed to generate activity. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center relative">
      <DotPattern className="absolute inset-0 opacity-50" />

      <header className="w-full p-4 flex justify-end">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button className="ghost" aria-label="Menu">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[200px] bg-white text-black">
            <nav className="flex flex-col space-y-4 mt-8">
              <a href="#" className="hover:underline">Home</a>
              <a href="#" className="hover:underline">About</a>
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Contact</a>
            </nav>
          </SheetContent>
        </Sheet>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-4 w-full">
        <div className="bg-black rounded-lg shadow-lg p-6 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
          <div className="text-center w-full mb-8">
            <div className="group relative mx-auto w-full max-w-[265px] sm:max-w-[300px] md:max-w-[350px]">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-purple-600 animate-border-beam"></div>
              </div>
              <Card className="relative w-full h-[57px] bg-black flex items-center justify-center p-1">
                <span className="text-4xl font-bold" style={{
                  color: '#FC4C02',
                  WebkitTextStroke: '1px black',
                  textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
                }}>
                  STRAVIFY
                </span>
              </Card>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl mt-4">Listening Activity Generator</h1>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="w-full space-y-6">
            <div className="space-y-2">
              <label htmlFor="metric" className="block text-sm font-medium">Metric</label>
              <Select value={metric} onValueChange={setMetric}>
                <SelectTrigger id="metric" className="w-full h-[25px] bg-white text-black" aria-label="Select metric">
                  <SelectValue placeholder="Select metric" />
                </SelectTrigger>
                <SelectContent className="bg-white text-black">
                  <SelectItem value="tracks">Top Songs</SelectItem>
                  <SelectItem value="artists">Top Artists</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="time" className="block text-sm font-medium">Time</label>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger id="time" className="w-full h-[25px] bg-white text-black" aria-label="Select time">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent className="bg-white text-black">
                  <SelectItem value="short_term">Last Month</SelectItem>
                  <SelectItem value="medium_term">Last 6 Months</SelectItem>
                  <SelectItem value="long_term">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="activity-name" className="block text-sm font-medium">Activity Name</label>
              <Input 
                id="activity-name"
                value={activityName}
                onChange={(e) => setActivityName(e.target.value)}
                type="text" 
                placeholder="Your activity name here" 
                className="w-full h-[25px] bg-white text-black placeholder-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Button 
                onClick={handleSpotifyLoginAndGenerate}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                disabled={isLoading}
                aria-live="polite"
                type="button"
              >
                {isLoading ? 'Processing...' : (accessToken ? 'Generate Activity' : 'Log in with Spotify')}
              </Button>
              <p className="text-xs text-center text-gray-400">
                {accessToken ? '(Click to generate your activity)' : '(Logging in will allow activity generation)'}
              </p>
            </div>
          </form>

          {topItems.length > 0 && (
            <div className="mt-8 w-full">
              <h2 className="text-xl font-bold mb-4">Your Top {metric === 'tracks' ? 'Tracks' : 'Artists'}</h2>
              <ul className="space-y-2">
                {topItems.map((item: any, index: number) => (
                  <li key={item.id} className="text-sm sm:text-base">
                    {index + 1}. {item.name}
                    {metric === 'tracks' && ` by ${item.artists.map((artist: any) => artist.name).join(', ')}`}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>

      <footer className="p-4 text-center w-full">
        <nav className="space-x-4">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Contact</a>
        </nav>
      </footer>
    </div>
  )
}