import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import PropTypes from "prop-types";
import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";

export const TradeForm = ({ existingTrade }) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  //we need the brokers
  const brokers = useSelector((x) => x.brokers.brokers);

  return (
    <Container className="mt-3">
      <h5>Trade Details</h5>
      <Row className="mb-3">
        <Col md={{ span: 6 }} className="ms-4">
          <Form.Group className="mt-2">
            <Controller
              name="brokerId"
              control={control}
              defaultValue={existingTrade?.brokerId}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.brokerId}>
                  <InputLabel>Broker</InputLabel>
                  <Select {...field} label="Broker">
                    {brokers &&
                      brokers.map((singleBroker, idx) => (
                        <MenuItem key={idx} value={singleBroker?.brokerId}>
                          {singleBroker?.brokerName}
                        </MenuItem>
                      ))}
                  </Select>
                  {errors.brokerId && (
                    <Form.Text className="text-danger ms-2">
                      {errors.brokerId.message}
                    </Form.Text>
                  )}
                </FormControl>
              )}
            />
          </Form.Group>
          <hr />
          <Form.Group className="mt-2">
            <Controller
              name="buyDate"
              control={control}
              defaultValue={new Date(existingTrade?.buyDate)}
              render={({ field: { ...restField } }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: errors.buyDate,
                        helperText: errors.buyDate?.message,
                      },
                    }}
                    onError={errors.buyDate}
                    {...restField}
                    label="Buy Date"
                  />
                </LocalizationProvider>
              )}
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Control
              type="text"
              placeholder="Buy Price"
              name="buyPrice"
              {...register("buyPrice", {
                value: existingTrade?.buyPrice,
              })}
              className={`form-control ${errors.buyPrice ? "is-invalid" : ""}`}
            />
            <Form.Control.Feedback type="invalid">
              {errors.buyPrice?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <hr />
          <Form.Group className="mt-2">
            <Controller
              name="sellDate"
              control={control}
              defaultValue={new Date(existingTrade?.sellDate)}
              render={({ field: { ...restField } }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: errors.sellDate,
                        helperText: errors.sellDate?.message,
                      },
                    }}
                    onError={errors.sellDate}
                    {...restField}
                    label="Sell Date"
                  />
                </LocalizationProvider>
              )}
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Control
              type="text"
              placeholder="Sell Price"
              name="sellPrice"
              {...register("sellPrice", {
                value: existingTrade?.sellPrice,
              })}
              className={`form-control ${errors.sellPrice ? "is-invalid" : ""}`}
            />
            <Form.Control.Feedback type="invalid">
              {errors.sellPrice?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <hr />
          <Form.Group className="mt-2">
            <Form.Control
              type="text"
              placeholder="Quantity"
              name="quantity"
              {...register("quantity", {
                value: existingTrade?.quantity,
              })}
              className={`form-control ${errors.quantity ? "is-invalid" : ""}`}
            />
            <Form.Control.Feedback type="invalid">
              {errors.quantity?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
};

TradeForm.propTypes = {
  existingTrade: PropTypes.object,
};
