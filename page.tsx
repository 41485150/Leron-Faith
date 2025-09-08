"use client"

import { useState } from "react"
import { VideoPlayer } from "@/components/video-player"
import { VideoFeed } from "@/components/video-feed"
import { SearchBar } from "@/components/search-bar"
import { BottomNavigation } from "@/components/bottom-navigation"
import { BackgroundPlayer } from "@/components/background-player"
import { useBackgroundAudio } from "@/hooks/use-background-audio"

export default function HomePage() {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null)
  const [isBackgroundMode, setIsBackgroundMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("home")

  const { currentTrack } = useBackgroundAudio()

  // Mock video data for the player
  const videoData = {
    "1": {
      src: "/placeholder.mp4",
      title: "Amazing Nature Documentary - Wildlife in 4K",
      thumbnail: "/nature-documentary-wildlife.jpg",
    },
    "2": {
      src: "/placeholder.mp4",
      title: "Learn React in 30 Minutes - Complete Beginner Tutorial",
      thumbnail: "/react-programming-tutorial.jpg",
    },
    "3": {
      src: "/placeholder.mp4",
      title: "Epic Gaming Moments - Best Highlights Compilation",
      thumbnail: "/gaming-highlights-compilation.jpg",
    },
    "4": {
      src: "/placeholder.mp4",
      title: "Cooking Masterclass - Perfect Pasta Every Time",
      thumbnail: "/cooking-pasta-masterclass.jpg",
    },
    "5": {
      src: "/placeholder.mp4",
      title: "Space Exploration - Journey to Mars Documentary",
      thumbnail: "/space-mars-exploration.jpg",
    },
    "6": {
      src: "/placeholder.mp4",
      title: "Fitness Workout - 20 Minute Full Body HIIT",
      thumbnail: "/fitness-workout-hiit.jpg",
    },
    "7": {
      src: "/placeholder.mp4",
      title: "Music Production Tutorial - Beat Making Basics",
      thumbnail: "/music-production-beat-making.jpg",
    },
    "8": {
      src: "/placeholder.mp4",
      title: "Travel Vlog - Exploring Tokyo's Hidden Gems",
      thumbnail: "/tokyo-travel-vlog-japan.jpg",
    },
  }

  const handleVideoSelect = (videoId: string) => {
    setSelectedVideoId(videoId)
    setIsBackgroundMode(false)
  }

  const handleBackgroundPlay = () => {
    setIsBackgroundMode(true)
  }

  const handleClosePlayer = () => {
    setSelectedVideoId(null)
    setIsBackgroundMode(false)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setActiveTab("search")
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    if (tab === "home") {
      setSearchQuery("")
    }
  }

  const handleExpandBackgroundPlayer = () => {
    setIsBackgroundMode(false)
  }

  const handleCloseBackgroundPlayer = () => {
    setIsBackgroundMode(false)
  }

  const renderContent = () => {
    switch (activeTab) {
      case "search":
        return (
          <div className="space-y-6">
            <SearchBar onSearch={handleSearch} />
            <VideoFeed onVideoSelect={handleVideoSelect} searchQuery={searchQuery} />
          </div>
        )
      case "library":
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-foreground mb-2">Your Library</h2>
            <p className="text-muted-foreground">Your saved videos and playlists will appear here.</p>
          </div>
        )
      case "profile":
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-foreground mb-2">Your Profile</h2>
            <p className="text-muted-foreground">Manage your account and preferences.</p>
          </div>
        )
      default: // home
        return <VideoFeed onVideoSelect={handleVideoSelect} searchQuery={searchQuery} />
    }
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">MiTube</h1>
              <p className="text-muted-foreground">Stream videos with background playback</p>
            </div>
            {activeTab !== "search" && (
              <div className="hidden md:block">
                <SearchBar onSearch={handleSearch} />
              </div>
            )}
          </div>
        </header>

        {selectedVideoId && !isBackgroundMode ? (
          <div className="space-y-6">
            {/* Currently Playing Video */}
            <div className="mb-8">
              <VideoPlayer
                src={videoData[selectedVideoId as keyof typeof videoData]?.src || "/placeholder.mp4"}
                title={videoData[selectedVideoId as keyof typeof videoData]?.title || "Video"}
                thumbnail={videoData[selectedVideoId as keyof typeof videoData]?.thumbnail}
                onBackgroundPlay={handleBackgroundPlay}
              />

              <div className="mt-4">
                <button
                  onClick={handleClosePlayer}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Back to feed
                </button>
              </div>
            </div>

            {/* Related Videos */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Up Next</h3>
              <VideoFeed onVideoSelect={handleVideoSelect} />
            </div>
          </div>
        ) : (
          /* Render content based on active tab */
          renderContent()
        )}

        {/* Background Player */}
        {currentTrack && (
          <BackgroundPlayer onExpand={handleExpandBackgroundPlayer} onClose={handleCloseBackgroundPlayer} />
        )}
      </div>

      <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}
