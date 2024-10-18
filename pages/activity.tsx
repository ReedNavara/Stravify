'use client'

import { Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface SongData {
  songName: string;
  artistName: string;
  plays: number;
  time: string;
  bpm: number;
  benefit: string;
}

const songData: SongData[] = [
  { songName: "Song Name", artistName: "Artist Name", plays: 69, time: "10:00", bpm: 180, benefit: "Zone 2" },
  { songName: "Song Name", artistName: "Artist Name", plays: 69, time: "10:00", bpm: 180, benefit: "Zone 2" },
  { songName: "Song Name", artistName: "Artist Name", plays: 69, time: "10:00", bpm: 180, benefit: "Zone 2" },
  { songName: "Song Name", artistName: "Artist Name", plays: 69, time: "10:00", bpm: 180, benefit: "Zone 2" },
  { songName: "Song Name", artistName: "Artist Name", plays: 69, time: "10:00", bpm: 180, benefit: "Zone 2" },
];

export default function ActivityStats() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col pt-4 sm:pt-6">
      <div className="absolute top-4 right-4 z-10">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Menu">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[200px] bg-gray-900 text-white">
            <nav className="flex flex-col space-y-4 mt-8">
              <a href="#" className="hover:underline">Home</a>
              <a href="#" className="hover:underline">About</a>
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Contact</a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      <header className="p-4 pt-12 sm:pt-16 text-center">
        <h1 className="text-2xl font-bold">Activity Name</h1>
        <p className="text-sm text-gray-400">Total Duration: </p>
      </header>

      <main className="flex-grow overflow-y-auto px-4 py-6 space-y-4 max-w-md mx-auto w-full">
        {songData.map((song, index) => (
          <Card key={index} className="bg-[#141413] text-white">
            <CardContent className="p-4 flex items-start space-x-4">
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-gray-600 rounded-full flex items-center justify-center mb-1">
                  {/* Placeholder for album art */}
                </div>
                <span className="text-xs text-gray-400">Plays</span>
                <span className="text-sm font-bold">{song.plays}</span>
              </div>
              <div className="flex-grow">
                <h2 className="text-base font-semibold">{song.songName} - {song.artistName}</h2>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div>
                    <p className="text-xs text-gray-400">Time</p>
                    <p className="text-sm font-medium">{song.time}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">BPM</p>
                    <p className="text-sm font-medium">{song.bpm}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Benefit</p>
                    <p className="text-sm font-medium">{song.benefit}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </main>

      <footer className="p-4 text-center">
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