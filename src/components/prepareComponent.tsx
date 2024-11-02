import { ethers } from "ethers";
import Papa from "papaparse";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { IAirdropList, ICSV } from "../interfaces/CSVInterface";
import { toast } from "react-toastify";
import { CgClose } from "react-icons/cg";
import { BiTrash } from "react-icons/bi";
import { nanoid } from "nanoid";
import { Parser } from "@json2csv/plainjs";
import { saveAs } from "file-saver";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setStep } from "../store/slices/stepSlice";
import {
  selectAirdropMakerList,
  selectCsvData,
  selectCsvDataError,
  selectCsvToJSONData,
  selectEligibleParticipantAddress,
  selectEligibleParticipantAmount,
  selectInvalidAirdropAddresses,
  selectPowerValue,
  selectShowCSVMaker,
  selectTokenAddress,
  selectTokenAddressError,
  setAirdropMakerList,
  setCsvData,
  setEligibleParticipantAddress,
  setEligibleParticipantAmount,
  setInvalidAirdropAddresses,
  setCsvDataError,
  setCsvToJSONData,
  setPowerValue,
  setShowCSVMaker,
  setTokenAddress,
  setTokenAddressError
} from "../store/slices/prepareSlice";

export function PrepareComponent() {
//   const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const airdropMakerList = useAppSelector(selectAirdropMakerList);
  const csvData = useAppSelector(selectCsvData);
  const tokenAddress = useAppSelector(selectTokenAddress);
  const csvToJSONData = useAppSelector(selectCsvToJSONData);
  const tokenAddressError = useAppSelector(selectTokenAddressError);
  const csvDataError = useAppSelector(selectCsvDataError);
  const invalidAirdropAddresses = useAppSelector(selectInvalidAirdropAddresses);
  const showCSVMaker = useAppSelector(selectShowCSVMaker);
  const eligibleParticipantAddress = useAppSelector(
    selectEligibleParticipantAddress
  );
  const eligibleParticipantAmount = useAppSelector(
    selectEligibleParticipantAmount
  );
  const powerValue = useAppSelector(selectPowerValue);

  //   const [tokenAddress, setTokenAddress] = useState("");
  //   const [csvData, setCsvData] = useState("");
  //   const [csvToJSONData, setCsvToJSONData] = useState<any>([]);
  //   const [tokenAddressError, setTokenAddressError] = useState("");
  //   const [csvDataError, setCsvDataError] = useState("");
  //   const [invalidAirdropAddresses, setInvalidAirdropAddresses] = useState([]);

  //   const [showCSVMaker, setShowCSVMaker] = useState(false);
  //   const [airdropMakerList, setAirdropMakerList] = useState<Array<IAirdropList>>(
  //     []
  //   );
  //   const [eligibleParticipantAddress, setEligibleParticipantAddress] =
  //     useState("");
  //   const [eligibleParticipantAmount, setEligibleParticipantAmount] =
  //     useState("");
  //   const [powerValue, setPowerValue] = useState("");

  const addEligibleParticipant = () => {
    const isAValidAddress = ethers.isAddress(eligibleParticipantAddress);

    if (!isAValidAddress) {
      toast.error("Not a valid address");
      return;
    }

    const anyDuplicate = airdropMakerList.filter(
      (eligibleParticipant) =>
        eligibleParticipant.address == eligibleParticipantAddress
    );

    if (anyDuplicate.length > 0) {
      toast.error("You have added this address already!");
      return;
    }

    if (parseFloat(eligibleParticipantAmount) == 0) {
      toast.error("Invalid amount");
      return;
    }

    if (parseInt(powerValue) == 0) {
      toast.error("Invalid power value");
      return;
    }

    dispatch(
      setAirdropMakerList(
        airdropMakerList.concat({
          address: eligibleParticipantAddress,
          amount: BigInt(
            parseFloat(eligibleParticipantAmount) *
              10 ** parseInt(powerValue ? powerValue : "18")
          ).toString(),
          id: nanoid(),
        })
      )
    );

    dispatch(setEligibleParticipantAddress(""));
    dispatch(setEligibleParticipantAmount(""));
    // setPowerValue("");
  };

  const deleteEligibleParticipant = (temporaryId: string) => {
    setAirdropMakerList(
      airdropMakerList.filter(
        (eligibleParticipant: IAirdropList) =>
          eligibleParticipant.id != temporaryId
      )
    );
  };

  const downloadCSV = () => {
    const value = airdropMakerList.map((eligibleParticipant: IAirdropList) => {
      return {
        address: eligibleParticipant.address,
        amount: eligibleParticipant.amount,
      };
    });

    try {
      const parser = new Parser();
      let csv = parser.parse(JSON.parse(JSON.stringify(value)));
      csv = csv.replace(/"/g, "");
      const blob = new Blob([csv], { type: "text/plain" });
      // Trigger the download
      saveAs(blob, "data.csv");
    } catch (error) {
      // console.log(error);
      toast.error("An error occurred while trying to create CSV");
    }
  };

  const handleChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (results: any) => {
          const invalidAddresses = results.data.filter(
            (result: ICSV) => !ethers.isAddress(result.address)
          );

          dispatch(setInvalidAirdropAddresses(invalidAddresses));

          // console.log(invalidAddresses);

          if (invalidAddresses.length > 0) {
            toast.error(invalidAddresses.join(", ") + " are invalid addresses");
            return;
          }

          const stringResult = results.data
            .map((result: ICSV) => {
              return `${result.address},${ethers.formatUnits(
                result.amount.toString(),
                18
              )}`;
            })
            .join(`\n`);

          // console.log(stringResult);
          dispatch(setCsvData(stringResult));
          dispatch(setCsvToJSONData(results.data));
        },
        header: true, // Set to true if your CSV has headers
      });
    }
  };

  const nextPage = () => {
    const isTokenAddressValid = ethers.isAddress(tokenAddress);

    if (
      !isTokenAddressValid ||
      !csvData ||
      invalidAirdropAddresses.length > 0
    ) {
      if (!isTokenAddressValid) {
        dispatch(setTokenAddressError("Kindly enter a valid token address"));
        toast.error("Kindly enter a valid token address");
      } else {
        dispatch(setTokenAddressError(""));
      }

      if (!csvData) {
        dispatch(setCsvDataError("Kindly upload a csv"));
        toast.error("Kindly upload a csv");
      } else {
        dispatch(setCsvDataError(""));
      }

      if (invalidAirdropAddresses.length > 0) {
        toast.error(
          invalidAirdropAddresses.join(", ") + " are invalid addresses"
        );
      }

      return;
    }

    sessionStorage.setItem("tokenAddress", tokenAddress);
    sessionStorage.setItem(
      "csvData",
      JSON.stringify(
          JSON.parse(JSON.stringify(csvToJSONData)).map((data: ICSV) => {
            console.log("Data", data.amount);
          data.amount = ethers.formatUnits(data.amount.toString(), 18);
          return data;
        })
      )
    );

    dispatch(setStep("settings"));
  };

  useEffect(() => {
    const isTokenAddressValid = ethers.isAddress(tokenAddress);

    if (!isTokenAddressValid) {
      dispatch(setTokenAddressError("Kindly enter a valid token address"));
    } else {
      dispatch(setTokenAddressError(""));
    }

    if (!csvData) {
      dispatch(setCsvDataError("Kindly upload a csv"));
    } else {
      dispatch(setCsvDataError(""));
    }

    if (invalidAirdropAddresses.length > 0) {
      toast.error(
        invalidAirdropAddresses.join(", ") + " are invalid addresses"
      );
    }
  }, [csvData, tokenAddress]);

  return (
    <div className="w-full flex justify-center items-center text-white p-2">
      <div
        className="p-4 w-full lg:w-[400px] xl:w-[600px] border-[3px] border-[#FFFFFF17] rounded-xl"
        style={{ background: "#8989890D", backdropFilter: "blur(150px)" }}
      >
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-left">Token address</div>
            <input
              className="w-full border-2 border-[#FFFFFF17] bg-transparent rounded-md py-2 px-1"
              placeholder="0x9E8882E178BD006Ef75F6b7D3C9A9EE129eb2CA8"
              value={tokenAddress}
              onChange={(e) => {
                dispatch(setTokenAddress(e.target.value));
              }}
            />
            <small
              className={`${
                tokenAddressError ? "block text-red-400" : "hidden"
              } mt-2`}
            >
              {tokenAddressError}
            </small>
          </div>
          <div>
            <div>List of addresses in CSV</div>
            <textarea
              className="w-full p-2 h-[200px] overflow-y-auto border-2 border-[2px] border-[#FFFFFF17] rounded-md bg-transparent"
              value={csvData}
            ></textarea>
            <div className="flex justify-between items-center">
              <div>
                Use a{" "}
                <button
                  onClick={() => {
                    dispatch(setShowCSVMaker(true));
                  }}
                  className="text-blue-400"
                >
                  CSV Maker
                </button>
              </div>
              <div className="py-4">
                <input
                  className="hidden"
                  type="file"
                  accept=".csv"
                  id="upload-button"
                  onClick={(e) => {
                    if (!ethers.isAddress(tokenAddress)) {
                      e.preventDefault();
                      toast.error("Enter Token address first!");
                      return;
                    }
                  }}
                  onChange={handleChange}
                />
                <label
                  className="border-[2px] border-[#FFFFFF17] rounded-md px-8 py-2"
                  htmlFor="upload-button"
                >
                  Upload CSV
                </label>
                <small
                  className={`${
                    csvDataError ? "block text-red-400" : "hidden"
                  } mt-2 text-center`}
                >
                  {csvDataError}
                </small>
              </div>
            </div>
          </div>
        </div>
        <button
          className="w-full bg-[#00A7FF] text-white py-2 rounded-md"
          onClick={nextPage}
        >
          Continue
        </button>
      </div>

      {/* CSV Maker starts here */}
      <div
        className={`${
          showCSVMaker
            ? "h-screen w-full flex justify-center items-center bg-[transparent] absolute top-[0] left-[0] backdrop-blur-lg p-4"
            : "hidden"
        }`}
      >
        <div className="w-full md:w-[600px] border-[3px] border-[#FFFFFF17] p-4 rounded-md flex flex-col gap-4 bg-[#0F195B]">
          <div>
            <CgClose
              className="ml-auto"
              onClick={() => {
                dispatch(setShowCSVMaker(false));
              }}
            />
          </div>
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="w-full">
              <input
                className="w-full border-2 border-[#FFFFFF17] bg-transparent rounded-md py-2 px-1"
                placeholder="Wallet address"
                value={eligibleParticipantAddress}
                onChange={(e) => {
                  setEligibleParticipantAddress(e.target.value);
                }}
              />
            </div>

            <div className="w-full border-2 border-[#FFFFFF17] bg-transparent rounded-md py-2 px-1 flex">
              <input
                className="bg-transparent md:w-[50%]"
                placeholder="Amount"
                value={eligibleParticipantAmount}
                onChange={(e) => {
                  setEligibleParticipantAmount(e.target.value);
                }}
              />
              <div className="flex md:w-[50%]">
                <div className="w-[50%] text-nowrap">x 10 ^</div>
                <input
                  type="text"
                  className="w-[50%] bg-transparent"
                  placeholder="Power"
                  value={powerValue}
                  onChange={(e) => {
                    dispatch(setPowerValue(e.target.value));
                  }}
                />
              </div>
            </div>
            <button
              className="bg-[#00A7FF] text-white px-4 py-2 rounded-md"
              onClick={addEligibleParticipant}
            >
              Add
            </button>
          </div>
          <div>
            <div className="w-full p-2 h-[200px] overflow-y-auto border-2 border-[2px] border-[#FFFFFF17] rounded-md bg-transparent">
              {airdropMakerList.length > 0 &&
                airdropMakerList.map(
                  (eligibleParticipant: IAirdropList, index: number) => {
                    return (
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="pr-4">{index + 1}.</div>
                          <div>
                            <div>{eligibleParticipant.address}</div>
                            <div>{eligibleParticipant.amount}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            deleteEligibleParticipant(eligibleParticipant.id);
                          }}
                        >
                          <BiTrash />
                        </button>
                      </div>
                    );
                  }
                )}
            </div>
          </div>
          <button
            className="w-full bg-[#00A7FF] text-white py-2 rounded-md"
            onClick={downloadCSV}
          >
            Download
          </button>
        </div>
      </div>
      {/* CSV Maker ends here */}
    </div>
  );
}
