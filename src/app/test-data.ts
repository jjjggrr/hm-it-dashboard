export const series = {
  errorRate: {
    Unit: {
      Name: "%"
    },
    Data: {
      Hub1: [],
      Hub2: [],
      Hub3: [],
      Hub4: [],
    },
    TimeUnits: [
      "T", "W", "M", "Y"
    ],
    DefaultUnit: "W",
    CriticalLimit: 30,//30-100
  },
  MTR: {
    Unit: {
      Name: "Minutes"
    },
    Data: {
      Hub1: [],
      Hub2: [],
      Hub3: [],
      Hub4: [],
    },
    TimeUnits: [
      "T", "W", "M", "Y"
    ],
    DefaultUnit: "W",
    CriticalLimit: 60,// 60 +
  },
  CFR: {
    Unit: {
      Name: "%"
    },
    Data: {
      Hub1: [],
      Hub2: [],
      Hub3: [],
      Hub4: [],
    },
    TimeUnits: [
      "W", "M", "Y"
    ],
    DefaultUnit: "W",
    CriticalLimit: 40,// 40-100
  },
  DownTime: {
    Unit: {
      Name: "%"
    },
    Data: {
      Hub1: [],
      Hub2: [],
      Hub3: [],
      Hub4: [],
    },
    TimeUnits: [
      "D", "W", "M", "Y"
    ],
    DefaultUnit: "W",
    CriticalLimit: 5,// 5 - 100
  },
  DeploymentFrequency: {
    Unit: {
      Name: "Deployments per Week and Team"
    },
    Data: {
      Hub1: [],
      Hub2: [],
      Hub3: [],
      Hub4: [],
    },
    TimeUnits: [
      "W", "M", "Y"
    ],
    DefaultUnit: "W",
    CriticalLimit: 2.5,// 0 - 2.5
  },
  SoftwareQuality: {
    Unit: {
      Name: "Rating"//A - D
    },
    Data: {
      Hub1: [],
      Hub2: [],
      Hub3: [],
      Hub4: [],
    },
    TimeUnits: [
      "W", "M", "Y"
    ],
    DefaultUnit: "M",
    CriticalLimit: "D",// a - c is ok
  },
  LeadTimeForFeatures: {
    Unit: {
      Name: "Weeks"
    },
    Data: {
      Hub1: [],
      Hub2: [],
      Hub3: [],
      Hub4: [],
    },
    TimeUnits: [
      "D", "W", "M", "Y"
    ],
    DefaultUnit: "M",
    CriticalLimit: 8,// 8+
  },
  AutomatedTestCoverage: {
    Unit: {
      Name: "%"
    },
    Data: {
      Hub1: [],
      Hub2: [],
      Hub3: [],
      Hub4: [],
    },
    TimeUnits: [
      "W", "M", "Y"
    ],
    DefaultUnit: "M",
    CriticalLimit: 15,// 0 - 15
  },
  BuildSuccessRate: {
    Unit: {
      Name: "%"
    },
    Data: {
      Hub1: [],
      Hub2: [],
      Hub3: [],
      Hub4: [],
    },
    TimeUnits: [
      "D", "W", "M", "Y"
    ],
    DefaultUnit: "W",
    CriticalLimit: 20,// 20-100
  },
  QADetectRate: {
    Unit: {
      Name: "Items per Week and Team"
    },
    Data: {
      Hub1: [],
      Hub2: [],
      Hub3: [],
      Hub4: [],
    },
    TimeUnits: [
      "W", "M", "Y"
    ],
    DefaultUnit: "W",
    CriticalLimit: 5,// 5+
  },
  AverageAPIResponseTime: {
    Unit: {
      Name: "ms"
    },
    Data: {
      Hub1: [],
      Hub2: [],
      Hub3: [],
      Hub4: [],
    },
    TimeUnits: [
      "D", "W", "M", "Y"
    ],
    DefaultUnit: "W",
    CriticalLimit: 500,// 500+
  },
  AcceptanceRate: {
    Unit: {
      Name: "Stars"// 1-5
    },
    Data: {
      Hub1: [],
      Hub2: [],
      Hub3: [],
      Hub4: [],
    },
    TimeUnits: [
      "W", "M", "Y"
    ],
    DefaultUnit: "W",
    CriticalLimit: 3,//1-3
  },
};
