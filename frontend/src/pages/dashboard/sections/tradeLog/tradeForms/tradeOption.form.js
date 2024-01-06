import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form";

export const TradeOptionForm = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Container className="mt-3">
      <h5>Option Details</h5>
      <Row className="mb-3">
        <Col md={{ span: 6 }} className="ms-4">
          <Form.Group>
            <Form.Control
              type="number"
              placeholder="Strike Price"
              name="strikePrice"
              {...register("strikePrice")}
              className={`form-control ${
                errors.strikePrice ? "is-invalid" : ""
              }`}
            />
            <Form.Control.Feedback type="invalid" className="ms-2">
              {errors.strikePrice?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mt-2">
            <Controller
              name="expirationDate"
              control={control}
              defaultValue={null}
              render={({ field: { ...restField } }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: errors.expirationDate,
                        helperText: errors.expirationDate?.message,
                      },
                    }}
                    onError={errors.expirationDate}
                    {...restField}
                    label="Expiration Date"
                  />
                </LocalizationProvider>
              )}
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Controller
              name="optionType"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.optionType}>
                  <InputLabel>Option Type</InputLabel>
                  <Select {...field} label="Option Type">
                    <MenuItem value="1">Call</MenuItem>
                    <MenuItem value="2">Put</MenuItem>
                  </Select>
                  {errors.optionType && (
                    <Form.Text className="text-danger ms-2">
                      {errors.optionType.message}
                    </Form.Text>
                  )}
                </FormControl>
              )}
            />
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
};
