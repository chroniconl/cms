'use client'
import React from 'react'
import { ResponsivePie } from '@nivo/pie'
import { Text } from '@/components/text'
import { Heading } from '@/components/heading'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface DataProps {
  totalBytes: number
  limitBytes: number
}

interface StorageUsageProps {
  data: DataProps
}

const UploadThingStorageSizePieChart: React.FC<StorageUsageProps> = ({
  data,
}) => {
  const usedGB = (data.totalBytes / 1000000000).toFixed(2)
  const limitGB = (data.limitBytes / 1000000000).toFixed(2)
  const remainingGB = (Number(limitGB) - Number(usedGB)).toFixed(2)

  const pieData = [
    {
      id: 'Used',
      label: 'Used',
      value: Number(usedGB),
      color: '#f97316',
    },
    {
      id: 'Remaining',
      label: 'Remaining',
      value: Number(remainingGB),
      color: '#2563eb',
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Media Storage Limit</CardTitle>
        <CardDescription>
          Here you can view the current storage limit and how much space is
          remaining.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative flex flex-col gap-2 pb-10">
          <div className="mt-4 h-40">
            <ResponsivePie
              data={pieData}
              margin={{ top: 0, right: 80, bottom: 0, left: 20 }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              colors={{ datum: 'data.color' }}
              borderWidth={1}
              borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
              theme={{
                labels: {
                  text: {
                    fill: '#ffffff', // White text for dark mode
                  },
                },
                tooltip: {
                  container: {
                    background: '#333', // Dark background for tooltip
                    color: '#ffffff', // White text for tooltip
                  },
                },
              }}
              tooltip={({ datum: { id, value, color } }) => (
                <div
                  style={{
                    padding: '5px 10px',
                    background: '#333',
                    color: '#ffffff',
                  }}
                >
                  <strong>{id}</strong>: {value} GB
                </div>
              )}
            />
          </div>
          <div className="absolute bottom-0 right-0 flex flex-col items-end">
            <Text>Used {usedGB} GB</Text>
            <Heading level={3}>{limitGB} GB Available</Heading>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default UploadThingStorageSizePieChart
