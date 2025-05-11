"use client"

import { useState } from "react"
import { MinusCircle, PlusCircle, ArrowLeft, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function SpecialScreen() {
  const [remainingPoints, setRemainingPoints] = useState(21)
  const [confirmed, setConfirmed] = useState(false)
  const [stats, setStats] = useState({
    strength: 5,
    perception: 5,
    endurance: 5,
    charisma: 5,
    intelligence: 5,
    agility: 5,
    luck: 5,
  })

  const statDescriptions = {
    strength: "Raw physical power. Affects melee damage and carrying capacity.",
    perception: "Awareness of your surroundings. Affects weapon accuracy in V.A.T.S.",
    endurance: "Physical stamina. Affects health points and resistance to disease.",
    charisma: "Ability to charm and convince. Affects speech and barter.",
    intelligence: "Knowledge and wisdom. Affects skill points per level.",
    agility: "Coordination and reflexes. Affects action points in V.A.T.S.",
    luck: "Good fortune. Affects critical chance and random encounters.",
  }

  const handleIncrement = (stat: keyof typeof stats) => {
    if (remainingPoints > 0 && stats[stat] < 10) {
      setStats({ ...stats, [stat]: stats[stat] + 1 })
      setRemainingPoints(remainingPoints - 1)
    }
  }

  const handleDecrement = (stat: keyof typeof stats) => {
    if (stats[stat] > 1) {
      setStats({ ...stats, [stat]: stats[stat] - 1 })
      setRemainingPoints(remainingPoints + 1)
    }
  }

  const handleConfirm = () => {
    setConfirmed(true)
  }

  const handleBack = () => {
    setConfirmed(false)
  }

  const captureScreenshot = () => {
    // This is a placeholder for actual screenshot functionality
    // In a real app, you would use a library like html2canvas
    alert("Screenshot functionality would be implemented here")
  }

  if (confirmed) {
    return (
      <div className="min-h-screen bg-black text-green-500 p-4 font-mono flex items-center justify-center">
        <div className="max-w-md w-full mx-auto">
          <div className="border-4 border-green-700 rounded-lg p-6 bg-black relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="absolute top-2 left-2 text-green-500 hover:text-green-400 hover:bg-green-900/30"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              <span>Back</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={captureScreenshot}
              className="absolute top-2 right-2 text-green-500 hover:text-green-400 hover:bg-green-900/30"
            >
              <Download className="h-5 w-5 mr-1" />
              <span>Save</span>
            </Button>

            <div className="text-center mb-6 pt-4">
              <h1 className="text-2xl font-bold tracking-wider">VAULT-TEC</h1>
              <h2 className="text-xl mb-2">S.P.E.C.I.A.L. SUMMARY</h2>
              <div className="h-1 w-3/4 mx-auto bg-green-500"></div>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-6">
              {Object.entries(stats).map(([stat, value]) => (
                <div key={stat} className="flex flex-col items-center">
                  <div className="text-xl font-bold">{stat.charAt(0)}</div>
                  <div className="text-2xl font-bold">{value}</div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {Object.entries(stats).map(([stat, value]) => (
                <div key={stat} className="flex items-center gap-3">
                  <div className="w-24 text-right uppercase font-bold">{stat}</div>
                  <div className="flex-1 h-4 bg-green-900 rounded-sm overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: `${(value / 10) * 100}%` }}></div>
                  </div>
                  <div className="w-6 text-center font-bold">{value}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center text-xs text-green-400">
              <p>POINTS REMAINING: {remainingPoints}</p>
              <p className="mt-2">VAULT-TEC INDUSTRIES &copy; 2077</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-green-500 p-4 font-mono">
      <div className="max-w-md mx-auto">
        <header className="text-center mb-6 border-b-2 border-green-500 pb-2">
          <h1 className="text-3xl font-bold tracking-wider">VAULT-TEC</h1>
          <h2 className="text-xl">S.P.E.C.I.A.L.</h2>
        </header>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold">REMAINING POINTS</h3>
            <span className="text-2xl font-bold">{remainingPoints}</span>
          </div>
          <Progress
            value={(remainingPoints / 21) * 100}
            className="h-2 bg-green-900"
            indicatorClassName="bg-green-500"
          />
        </div>

        <div className="space-y-6">
          {Object.entries(stats).map(([stat, value]) => (
            <div key={stat} className="border-2 border-green-700 p-4 rounded-md bg-black/50">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold uppercase">{stat.charAt(0)}</h3>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDecrement(stat as keyof typeof stats)}
                    disabled={stats[stat as keyof typeof stats] <= 1}
                    className="h-8 w-8 rounded-full border-green-500 text-green-500 hover:bg-green-900 hover:text-green-300"
                  >
                    <MinusCircle className="h-5 w-5" />
                    <span className="sr-only">Decrease {stat}</span>
                  </Button>

                  <span className="text-2xl font-bold min-w-[1.5rem] text-center">{value}</span>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleIncrement(stat as keyof typeof stats)}
                    disabled={remainingPoints <= 0 || stats[stat as keyof typeof stats] >= 10}
                    className="h-8 w-8 rounded-full border-green-500 text-green-500 hover:bg-green-900 hover:text-green-300"
                  >
                    <PlusCircle className="h-5 w-5" />
                    <span className="sr-only">Increase {stat}</span>
                  </Button>
                </div>
              </div>

              <div className="flex gap-2 mb-2">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className={`h-2 flex-1 ${i < value ? "bg-green-500" : "bg-green-900"}`} />
                ))}
              </div>

              <p className="text-xs text-green-400">{statDescriptions[stat as keyof typeof statDescriptions]}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button
            className="bg-green-700 hover:bg-green-600 text-black font-bold py-2 px-6 rounded-md"
            onClick={handleConfirm}
          >
            CONFIRM
          </Button>
        </div>
      </div>
    </div>
  )
}
