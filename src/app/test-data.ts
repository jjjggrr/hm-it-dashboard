export const series = {
  errorRate: {
    Unit: {
      Name: "%",
      FailureLimit: 50,   // 50% is 0 points
      CriticalLimit: 30,  // 30% is 60 points
      Target: 1,          // 1% is 100 points
    },
    Data: {
      Hub1: [0.1, 5.3, 1.2, 0.5, 3.7, 2.1, 4.5, 2.8, 4.2, 1.9, 5.5, 3.1],
      Hub2: [4.5, 3.2, 1.8, 0.9, 12.3, 5.6, 28.1, 30.4, 2.1, 1.1, 6.7, 4.9],
      Hub3: [8.5, 12.1, 7.9, 15.3, 5.4, 29.8, 11.2, 6.7, 9.1, 4.3, 14.5, 8.8],
      Hub4: [0.1, 0.3, 0.2, 1.1, 0.5, 0.8, 2.3, 0.4, 0.6, 1.5, 0.7, 0.9],
    },
    TimeUnits: ["D", "W", "M", "Y"],
    DefaultUnit: "W"
  },
  MTR: {
    Unit: {
      Name: "Minutes",
      FailureLimit: 1440, // 1 day is 0 points
      CriticalLimit: 60,  // 60 mins is 60 points
      Target: 10,         // 10 mins is 100 points
    },
    Data: {
      Hub1: [ 15.2, 23.1, 8.5, 45.6, 32.1, 19.7, 33.4, 41.9, 12.3, 5.8, 21.2, 37.5, ],
      Hub2: [ 25.8, 11.3, 42.1, 62.5, 38.7, 55.9, 14.6, 49.2, 22.8, 31.1, 7.4, 51.3, ],
      Hub3: [ 10.1, 36.5, 53.2, 28.9, 47.8, 16.4, 68.9, 21.7, 4.5, 44.3, 32.6, 59.9, ],
      Hub4: [ 6.7, 18.2, 40.3, 27.4, 52.1, 3.9, 34.8, 13.5, 46.7, 24.6, 39.1, 57.2, ],
    },
    TimeUnits: ["D", "W", "M", "Y"],
    DefaultUnit: "W",
  },
  CFR: {
    Unit: {
      Name: "%",
      FailureLimit: 60,   // 60% is 0 points
      CriticalLimit: 40,  // 40% is 60 points
      Target: 5,          // 5% is 100 points
    },
    Data: {
      Hub1: [ 12.3, 25.1, 8.9, 33.4, 19.7, 5.2, 12.6, 14.8, 29.5, 8.1, 3.7, 5.9, ],
      Hub2: [ 28.4, 15.6, 39.8, 7.1, 21.9, 31.2, 11.5, 2.4, 26.7, 18.3, 34.5, 9.8, ],
      Hub3: [ 23.7, 41.2, 17.4, 30.1, 6.5, 37.8, 13.9, 24.6, 4.3, 32.8, 20.2, 10.7, ],
      Hub4: [ 16.2, 27.3, 1.9, 35.1, 19.4, 8.6, 29.9, 12.1, 25.8, 38.2, 5.4, 21.3, ],
    },
    TimeUnits: ["W", "M", "Y"],
    DefaultUnit: "W",
  },
  DownTime: {
    Unit: {
      Name: "%",
      FailureLimit: 10,   // 10% is 0 points
      CriticalLimit: 5,   // 5% is 60 points
      Target: 0.1,        // 0.1% is 100 points
    },
    Data: {
      Hub1: [0.2, 3.4, 0.1, 0.8, 4.1, 2.3, 5.2, 1.8, 3.9, 0.9, 3.7, 2.0],
      Hub2: [4.5, 2.1, 0.3, 3.9, 1.5, 7.8, 4.8, 3.3, 2.6, 0.7, 4.2, 1.1],
      Hub3: [2.8, 12.3, 4.6, 1.4, 3.1, 0.6, 4.4, 2.9, 8.4, 3.5, 0.2, 4.0],
      Hub4: [0.8, 1.6, 3.2, 4.7, 2.2, 1.0, 3.6, 5.5, 2.7, 4.3, 1.3, 0.4],
    },
    TimeUnits: ["D", "W", "M", "Y"],
    DefaultUnit: "W",
  },
  DeploymentFrequency: {
    Unit: { 
      Name: "Depl. per Team", 
      Type: "Number",
      FailureLimit: 0,    // 0 is 0 points
      CriticalLimit: 2.5, // 2.5 is 60 points
      Target: 10,         // 10 is 100 points
    }, 
    Data: {
      Hub1: [45.6, 12.3, 38.1, 38.4, 15.7, 14.9, 18.2, 29.3, 7.5, 25.0, 34.1, 12.8],
      Hub2: [ 10.5, 6.2, 17.8, 3.1, 25.6, 41.2, 9.4, 13.7, 5.8, 20.1, 31.5, 16.9, ],
      Hub3: [7.1, 19.5, 4.4, 1.8, 14.2, 28.6, 6.7, 51.3, 10.9, 23.8, 8.0, 16.1],
      Hub4: [3.3, 8.9, 4.7, 11.6, 6.1, 15.3, 2.9, 20.8, 9.2, 12.5, 5.4, 18.0],
    },
    TimeUnits: ["W", "M", "Y"],
    DefaultUnit: "W",
  },
  SoftwareQuality: {
    Unit: {
      Name: "Rating",
      FailureLimit: 1,    // Rating of 1 is 0 points
      CriticalLimit: 2,   // Rating of 2 is 60 points
      Target: 4,          // Rating of 4 is 100 points
    },
    Data: {
      Hub1: [4, 3, 4, 2, 3, 4, 3, 2, 4, 4, 3, 1],
      Hub2: [3, 4, 2, 4, 3, 4, 3, 2, 2, 4, 3, 4],
      Hub3: [4, 2, 3, 4, 1, 4, 3, 4, 2, 3, 4, 3],
      Hub4: [2, 4, 3, 4, 2, 3, 4, 1, 3, 4, 2, 4],
    },
    TimeUnits: ["W", "M", "Y"],
    DefaultUnit: "M",
  },
  LeadTimeForFeatures: {
    Unit: {
      Name: "Weeks",
      FailureLimit: 26,   // 26 weeks is 0 points
      CriticalLimit: 8,   // 8 weeks is 60 points
      Target: 1,          // 1 week is 100 points
    },
    Data: {
      Hub1: [3.4, 9.1, 5.6, 1.2, 11.3, 7.8, 4.1, 2.5, 6.7, 14.2, 0.9, 5.0],
      Hub2: [6.3, 2.1, 7.9, 4.5, 10.5, 1.8, 3.3, 0.4, 5.9, 7.1, 8.8, 2.7],
      Hub3: [12.1, 4.8, 1.6, 6.2, 0.7, 7.5, 15.0, 3.9, 5.3, 9.9, 2.0, 6.8],
      Hub4: [1.1, 5.2, 8.4, 3.6, 7.0, 1.9, 4.3, 6.5, 0.3, 10.1, 2.8, 4.9],
    },
    TimeUnits: ["D", "W", "M", "Y"],
    DefaultUnit: "M",
  },
  AutomatedTestCoverage: {
    Unit: {
      Name: "%",
      FailureLimit: 0,    // 0% is 0 points
      CriticalLimit: 15,  // 15% is 60 points
      Target: 80,         // 80% is 100 points
    },
    Data: {
      Hub1: [ 65.4, 62.1, 67.8, 98.1, 85.3, 73.7, 88.9, 76.2, 51.9, 88.0, 61.5, 79.6, ],
      Hub2: [ 18.7, 39.4, 72.0, 5.5, 91.3, 26.8, 55.1, 83.4, 64.7, 30.2, 47.9, 99.1, ],
      Hub3: [ 16.5, 44.8, 80.6, 7.3, 29.1, 58.4, 73.9, 95.2, 14.2, 36.0, 61.3, 85.7, ],
      Hub4: [ 20.3, 11.8, 50.1, 78.5, 93.6, 32.7, 68.2, 89.9, 42.4, 57.0, 70.8, 24.0, ],
    },
    TimeUnits: ["W", "M", "Y"],
    DefaultUnit: "M",
  },
  BuildSuccessRate: {
    Unit: {
      Name: "%",
      FailureLimit: 0,    // 0% is 0 points
      CriticalLimit: 20,  // 20% is 60 points
      Target: 85,         // 85% is 100 points
    },
    Data: {
      Hub1: [78.3, 57.2, 71.7, 61.4, 81.9, 85.6, 99.8, 73.1, 77.4, 69.0, 54.5, 78.2],
      Hub2: [2.7, 14.8, 8.1, 17.5, 6.3, 28.9, 10.4, 19.8, 3.6, 12.9, 35.1, 9.2],
      Hub3: [15.3, 11.1, 4.8, 18.6, 25.7, 7.0, 13.4, 1.5, 16.9, 9.5, 19.9, 5.7],
      Hub4: [8.8, 17.2, 2.1, 14.3, 6.9, 12.0, 42.0, 10.6, 18.1, 3.4, 15.8, 9.3],
    },
    TimeUnits: ["D", "W", "M", "Y"],
    DefaultUnit: "W",
  },
  QADetectRate: {
    Unit: {
      Name: "Items/Week",
      FailureLimit: 10,   // 10 items is 0 points
      CriticalLimit: 5,   // 5 items is 60 points
      Target: 0,          // 0 items is 100 points
    },
    Data: {
      Hub1: [2.1, 2.3, 4.1, 2.3, 1.8, 0.5, 0, 3.9, 4.8, 2.0, 0.9, 3.3],
      Hub2: [4.5, 9.4, 1.2, 15.2, 0.7, 2.9, 7.8, 3.7, 4.9, 1.1, 2.5, 3.1],
      Hub3: [5.5, 3.8, 2.2, 1.6, 11.9, 4.4, 0.3, 4.9, 17.1, 2.8, 1.4, 3.5],
      Hub4: [2.7, 6.2, 4.6, 1.3, 10.7, 3.0, 0.6, 8.9, 4.1, 2.4, 1.9, 3.4],
    },
    TimeUnits: ["W", "M", "Y"],
    DefaultUnit: "W",
  },
  AverageAPIResponseTime: {
    Unit: {
      Name: "ms",
      FailureLimit: 2000, // 2000ms is 0 points
      CriticalLimit: 500, // 500ms is 60 points
      Target: 100,        // 100ms is 100 points
    },
    Data: {
      Hub1: [ 148.3, 210.5, 101.1, 450.7, 221.6, 178.4, 166.2, 112.9, 123.0, 288.1, 155.5, 223.7, ],
      Hub2: [ 162.1, 177.8, 245.3, 411.2, 134.9, 389.0, 158.7, 599.3, 199.6, 290.4, 495.1, 140.2, ],
      Hub3: [ 151.4, 218.9, 288.6, 433.0, 95.8, 167.3, 222.5, 477.7, 130.1, 345.9, 112.4, 399.8, ],
      Hub4: [ 205.2, 333.6, 119.7, 466.8, 678.0, 142.1, 173.5, 267.4, 145.9, 376.2, 83.3, 191.0, ],
    },
    TimeUnits: ["D", "W", "M", "Y"],
    DefaultUnit: "W",
  },
  AcceptanceRate: {
    Unit: {
      Name: "Stars",
      FailureLimit: 1,    // 1 star is 0 points
      CriticalLimit: 3,   // 3 stars is 60 points
      Target: 5,          // 5 stars is 100 points
    },
    Data: {
      Hub1: [4.1, 3.8, 4.5, 2.1, 3.3, 4.9, 3.6, 4.2, 3.9, 4.7, 3.1, 4.4],
      Hub2: [3.5, 4.6, 3.2, 4.8, 3.7, 4.0, 3.4, 4.3, 4.9, 3.1, 4.5, 3.8],
      Hub3: [4.2, 3.9, 4.7, 3.3, 4.1, 1.9, 4.6, 3.5, 4.8, 3.2, 4.4, 2.9],
      Hub4: [3.7, 4.9, 3.2, 4.5, 4.0, 3.6, 4.3, 3.8, 4.1, 3.4, 4.7, 4.8],
    },
    TimeUnits: ["W", "M", "Y"],
    DefaultUnit: "W",
  },
};
