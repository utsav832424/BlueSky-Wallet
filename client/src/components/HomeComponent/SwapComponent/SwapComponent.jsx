import React, { useState, useEffect } from "react";
import Style from "./SwapComponent.module.css";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  List,
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar,
  Box,
} from "@mui/material";
import { FaChevronDown } from "react-icons/fa";
import { MdSwapVert } from "react-icons/md";

const tokens = [
  {
    symbol: "ETH",
    name: "Ethereum",
    image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    image: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
  },
  {
    symbol: "DAI",
    name: "Dai",
    image: "https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png",
  },
  {
    symbol: "BUSD",
    name: "Binance USD",
    image: "https://cryptologos.cc/logos/binance-usd-busd-logo.png",
  },
];

const SwapComponent = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [baseToken, setBaseToken] = useState(null);
  const [quoteToken, setQuoteToken] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogType, setDialogType] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleOpen = (type) => {
    setDialogType(type);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleSelectToken = (token) => {
    if (dialogType == "base") {
      setBaseToken(token);
    } else {
      setQuoteToken(token);
    }
    setOpen(false);
  };

  const handleSwap = () => {
    const temp = quoteToken;
    setQuoteToken(baseToken);
    setBaseToken(temp);
  };

  const checkDataDisabled = () => {
    if (baseToken && quoteToken && baseToken.amount > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const handleSubmit = () => {};

  const filteredTokens = tokens
    .filter(
      (token) =>
        token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (token) =>
        (dialogType === "base" && token !== quoteToken) ||
        (dialogType == "quote" && token !== baseToken)
    );
  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    checkDataDisabled();
  }, [baseToken, quoteToken]);

  return (
    <div className={Style.swapComp}>
      <div className={Style.swap_box}>
        <div className={Style.leftIconBox}>
          <div className={Style.back_icon} onClick={handleGoBack}>
            <MdOutlineArrowBackIos />
          </div>
          <h3>Swap</h3>
        </div>

        <div className={Style.swapMain_box}>
          <div className={Style.baseToken_box}>
            <div
              className={Style.baseToken_select}
              onClick={() => handleOpen("base")}
            >
              {baseToken ? (
                <Box className={Style.selectedTokenBox}>
                  <Avatar
                    src={baseToken.image}
                    alt={baseToken.name}
                    className={Style.tokenImage}
                  />
                  <span>{baseToken.symbol}</span>
                </Box>
              ) : (
                <span>Select Token</span>
              )}
              <FaChevronDown style={{ color: "gray" }} />
            </div>
            <input
              type="number"
              name="baseAmount"
              value={baseToken ? baseToken.amount : 0}
              onChange={(e) => {
                setBaseToken((prev) => ({ ...prev, amount: e.target.value }));
              }}
              className={Style.baseAmountField}
            />
          </div>
          <div className={Style.middleLine}>
            <div className={Style.swapIcon} onClick={handleSwap}>
              <MdSwapVert />
            </div>
          </div>
          <div className={Style.baseToken_box}>
            <div
              className={Style.baseToken_select}
              onClick={() => handleOpen("quote")}
            >
              {quoteToken ? (
                <Box className={Style.selectedTokenBox}>
                  <Avatar
                    src={quoteToken.image}
                    alt={quoteToken.name}
                    className={Style.tokenImage}
                  />
                  <span>{quoteToken.symbol}</span>
                </Box>
              ) : (
                <span>Select Token</span>
              )}
              <FaChevronDown style={{ color: "gray" }} />
            </div>
            <input
              type="number"
              name="baseAmount"
              readOnly="true"
              value={quoteToken ? quoteToken.amount : ""}
              className={Style.baseAmountField}
            />
          </div>
        </div>
        <button
          className={Style.swapBtn}
          disabled={isDisabled}
          onClick={handleSubmit}
        >
          swap
        </button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
            },
          },
        }}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Select a Token</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Search Token"
            variant="outlined"
            value={searchTerm}
            className={Style.searchField}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <List className={Style.tokenList}>
            {filteredTokens.map((token) => (
              <ListItem
                button
                key={token.symbol}
                onClick={() => handleSelectToken(token)}
              >
                <ListItemAvatar>
                  <Avatar src={token.image} alt={token.name} />
                </ListItemAvatar>
                <ListItemText primary={token.name} secondary={token.symbol} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SwapComponent;
