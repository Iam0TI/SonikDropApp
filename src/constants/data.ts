import { IDropComp } from "../components/claimComponent";
import { TabSwitch } from "../pages/Claim";

export const tabs: TabSwitch[] = [
  { name: "Tokens", isSelected: true },
  { name: "POAPs", isSelected: false },
];


export const TokenDrops: IDropComp[] = [
  {
    name: "Pengu",
    creator: "0x0f09D1Fb501041E32170b1B759f1b2ef6349C490",
    date: "24.10.24",
    totalRewardPool: 20000,
    totalRewardClaimed: 1500,
    totalParticipants: 2000,
    totalClaims: 200,
    nftAddress: "0x53182725595443ba2bB9EbEfE716EE72761a3CD3",
  },
  {
    name: "Sonik",
    creator: "0x0f09D1Fb501041E32170b1B759f1b2ef6349C490",
    totalRewardPool: 100000,
    totalRewardClaimed: 0,
    totalParticipants: 6000,
    totalClaims: 0,
    nftAddress: "0x53182725595443ba2bB9EbEfE716EE72761a3CD3",
  },
  {
    name: "Align",
    creator: "0x53182725595443ba2bB9EbEfE716EE72761a3CD3",
    date: "24.10.24",
    totalRewardPool: 5000000,
    totalRewardClaimed: 250000,
    totalParticipants: 500,
    totalClaims: 250,
    nftAddress: "0x0f09D1Fb501041E32170b1B759f1b2ef6349C490",
  },
  {
    name: "MonBebe",
    creator: "0x53182725595443ba2bB9EbEfE716EE72761a3CD3",
    totalRewardPool: 15000000,
    totalRewardClaimed: 1000000,
    totalParticipants: 64000,
    totalClaims: 30000,
  },
  {
    name: "ChillGuy",
    creator: "0x53182725595443ba2bB9EbEfE716EE72761a3CD3",
    date: "24.11.24",
    totalRewardPool: 1500000000,
    totalRewardClaimed: 100000000,
    totalParticipants: 64000,
    totalClaims: 50000,
    nftAddress: "0x0f09D1Fb501041E32170b1B759f1b2ef6349C490",
  },
  {
    name: "Dogs",
    creator: "0x0f09D1Fb501041E32170b1B759f1b2ef6349C490",
    date: "24.11.24",
    totalRewardPool: 1500000,
    totalRewardClaimed: 900000,
    totalParticipants: 640000,
    totalClaims: 600000,
    nftAddress: "0x53182725595443ba2bB9EbEfE716EE72761a3CD3",
  },
  {
    name: "ChillGirl",
    creator: "0x0f09D1Fb501041E32170b1B759f1b2ef6349C490",
    date: "28.11.24",
    totalRewardPool: 18000000,
    totalRewardClaimed: 1900000,
    totalParticipants: 164000,
    totalClaims: 160000,
    nftAddress: "0x53182725595443ba2bB9EbEfE716EE72761a3CD3",
  },
  {
    name: "Sonik",
    creator: "0x0f09D1Fb501041E32170b1B759f1b2ef6349C490",
    date: "30.12.24",
    totalRewardPool: 8000000,
    totalRewardClaimed: 1900000,
    totalParticipants: 14000,
    totalClaims: 10000,
  },
  {
    name: "Santa",
    creator: "0x0f09D1Fb501041E32170b1B759f1b2ef6349C490",
    date: "25.12.24",
    totalRewardPool: 5000000000,
    totalRewardClaimed: 1500000,
    totalParticipants: 16000,
    totalClaims: 5000,
  },
];

export const POAPDrops: IDropComp[] = [
  {
    name: "DevconSEA",
    creator: "0x0f09D1Fb501041E32170b1B759f1b2ef6349C490",
    date: "24.12.24",
    totalRewardPool: 2000,
    totalRewardClaimed: 1500,
    totalParticipants: 2000,
    totalClaims: 1500,
  },
  {
    name: "Scroll Buidl",
    creator: "0x0f09D1Fb501041E32170b1B759f1b2ef6349C490",
    date: "24.10.24",
    totalRewardPool: 6000,
    totalRewardClaimed: 5000,
    totalParticipants: 6000,
    totalClaims: 5000,
  },
  {
    name: "Align Buidl",
    creator: "0x53182725595443ba2bB9EbEfE716EE72761a3CD3",
    totalRewardPool: 500,
    totalRewardClaimed: 250,
    totalParticipants: 500,
    totalClaims: 250,
  },
  {
    name: "Build Guild",
    creator: "0x53182725595443ba2bB9EbEfE716EE72761a3CD3",
    date: "24.10.24",
    totalRewardPool: 64000,
    totalRewardClaimed: 1000,
    totalParticipants: 64000,
    totalClaims: 1000,
  },
  {
    name: "ChillGuys Meetup",
    creator: "0x53182725595443ba2bB9EbEfE716EE72761a3CD3",
    date: "24.11.24",
    totalRewardPool: 6000,
    totalRewardClaimed: 1000,
    totalParticipants: 6000,
    totalClaims: 1000,
  },
  {
    name: "Kaia Club",
    creator: "0x0f09D1Fb501041E32170b1B759f1b2ef6349C490",
    date: "24.11.24",
    totalRewardPool: 150,
    totalRewardClaimed: 150,
    totalParticipants: 150,
    totalClaims: 150,
  },
  {
    name: "Base Meetup",
    creator: "0x0f09D1Fb501041E32170b1B759f1b2ef6349C490",
    date: "28.11.24",
    totalRewardPool: 1800,
    totalRewardClaimed: 1000,
    totalParticipants: 1800,
    totalClaims: 1000,
  },
  {
    name: "Bored Devs",
    creator: "0x0f09D1Fb501041E32170b1B759f1b2ef6349C490",
    totalRewardPool: 800,
    totalRewardClaimed: 400,
    totalParticipants: 800,
    totalClaims: 400,
  },
  {
    name: "Santa Comes",
    creator: "0x0f09D1Fb501041E32170b1B759f1b2ef6349C490",
    date: "25.12.24",
    totalRewardPool: 1600,
    totalRewardClaimed: 1500,
    totalParticipants: 1600,
    totalClaims: 1500,
  },
];


