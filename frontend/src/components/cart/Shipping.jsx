import React, {  useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cart_action";
import MetaData from "../layout/metaData/MetaData";
import PinDropIcon from "@mui/icons-material/PinDrop";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length !== 10) {
      toast.error("Phone Number should be 10 digits Long");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    navigate("/order/confirm");
  };

  return (
    <>
      <MetaData title="Shipping Details" />

      <CheckoutSteps activeStep={0} />

      <div className="container my-4 ">

        <div className="row justify-content-center">

          <div className="col-md-6 shadow-lg px-5 pt-3 pb-4">

            <h2 className=" text-center">Shipping Details</h2>
            <hr  className="mx-5"/>

            <form onSubmit={shippingSubmit}>

              <div className="mt-5 mb-3">
                <div className="input-group">
                  <span className="input-group-text"><HomeIcon /></span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3">
                <div className="input-group">
                  <span className="input-group-text"><LocationCityIcon /></span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="City"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3">
                <div className="input-group">
                  <span className="input-group-text"><PinDropIcon /></span>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Pin Code"
                    required
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3">
                <div className="input-group">
                  <span className="input-group-text"><PhoneIcon /></span>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Phone Number"
                    required
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    
                  />
                </div>
              </div>

              <div className="mb-3">
                <div className="input-group">
                  <span className="input-group-text"><PublicIcon /></span>
                  <select
                    className="form-control"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="">Country</option>

                    {Country &&
                      Country.getAllCountries().map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}

                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {country && (
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text"><TransferWithinAStationIcon /></span>
                    <select
                      className="form-control"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    >
                      <option value="">State</option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option key={item.isoCode} value={item.isoCode}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              )}


           

              <input
                type="submit"
                value="Continue"
                className="btn btn-primary w-100 mt-2"
                disabled={!state}
              />
            </form>


          </div>
        </div>
      </div>
    </>
  );
};

export default Shipping;

