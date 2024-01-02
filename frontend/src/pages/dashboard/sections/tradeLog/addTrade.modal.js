import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Alert, Modal, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import { tradesActions } from "../../../../_store";
import { StockSearchForm } from "./tradeForms/stockSearch.form";
import { TradeForm } from "./tradeForms/trade.form";
import { TradeOptionForm } from "./tradeForms/tradeOption.form";

const validationSchema = yup.object({
  strikePrice: yup.number().when("$exist", {
    is: (exist) => exist,
    then: () => yup.number().required("Strike Price is required"),
    otherwise: () => yup.string(),
  }),
  expirationDate: yup.string().when("$exist", {
    is: (exist) => exist,
    then: () => yup.number().required("Expiration Date is required"),
    otherwise: () => yup.string(),
  }),
  optionType: yup.number().when("$exist", {
    is: (exist) => exist,
    then: () =>
      yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable()
        .required("Quantity is required"),
    otherwise: () => yup.string(),
  }),
  brokerId: yup.string().required("Broker is required"),
  buyDate: yup.string().required("Buy Date is required"),
  buyPrice: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .nullable()
    .required("Buy Price is required"),
  sellDate: yup.string().required("Sell Date is required"),
  sellPrice: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .nullable()
    .required("Sell Price is required"),
  quantity: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .nullable()
    .required("Quantity is required"),
});
export const AddTradeModal = ({ show, onHide, isOption }) => {
  const [selectedStock, setSelectedStock] = useState(null);
  const [missingStockError, setMissingStockError] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [backdropValue, setBackdropValue] = useState("false");
  const [enableKeyboard, setEnableKeyboard] = useState(true);

  const dispatch = useDispatch();
  const tradesError = useSelector((x) => x.trades.error);

  const formOptions = { resolver: yupResolver(validationSchema) };

  const methods = useForm(formOptions);
  const { handleSubmit } = methods;
  const onSubmit = async (data) => {
    //verify the person selected a stock
    setMissingStockError(false);
    if (!selectedStock) {
      setMissingStockError(true);
      return;
    }
    setIsSaving(true);
    setBackdropValue("static");
    setEnableKeyboard(false);

    //add the ticker symbol to the data
    data.ticker = selectedStock?.original?.ticker;
    data.isOption = isOption;
    await dispatch(tradesActions.createNewTrade(data));

    if (tradesError) {
      setIsSaving(false);
      return;
    }

    setIsSaving(false);
    setIsSaved(true);
    setBackdropValue("false");
    setEnableKeyboard(true);
    setTimeout(() => onHide(), 2000);
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      keyboard={enableKeyboard}
      backdrop={backdropValue}
    >
      <Modal.Header>
        <Modal.Title>Add Trade</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isSaving && (
          <div className="text-center">
            <Spinner animation="border" />
            <p className="mt-2">Saving Trade...</p>
          </div>
        )}
        {isSaved && (
          <div className="text-center">
            <FontAwesomeIcon icon={faCheckCircle} size="3x" color="green" />
            <p className="mt-2">Trade Saved Successfully!</p>
          </div>
        )}
        {!isSaving && !isSaved && (
          <>
            <StockSearchForm
              setSelection={setSelectedStock}
              selection={selectedStock}
            />
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                {isOption && <TradeOptionForm />}

                <TradeForm className="mt-2" />
                {missingStockError && (
                  <Alert variant="danger" className="my-3" dismissible>
                    Please select a stock
                  </Alert>
                )}
                <Button type="submit">Save Trade</Button>
              </form>
            </FormProvider>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

AddTradeModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  isOption: PropTypes.bool,
};
