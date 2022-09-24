import React, { useEffect, useContext } from 'react';
import { Context } from '..';
import { getBasket } from '../http/deviceAPI';
import { Card, Col, Container, Row } from 'react-bootstrap'
import { observer } from 'mobx-react-lite';
import GooglePayButton from '@google-pay/button-react'

const Basket = observer(() => {
    const {device} = useContext(Context)

    useEffect(() => {
        getBasket().then(data => device.setBaskets(data))
    }, [])
    return (
        <Container
            className="d-flex flex-sm-column justify-content-center align-items-center mt-3"
        >
            <h1 className="pb-2">Корзина</h1>

            {device.basket?.map(product =>
                <Card className="d-flex w-100 p-2 justify-content-center mb-2" key={product.id}>
                    <Row className="d-flex w-100">
                        <Col>
                            <div className="d-flex flex-row align-items-center">
                                <img src={process.env.REACT_APP_API_URL + product.device.img} width={50} />
                                <h1 className="pl-3">{product.device.name}</h1>
                            </div>
                        </Col>
                        <Col>
                            <div className="d-flex h-100 flex-row justify-content-end align-items-center">
                                <h2 className="font-weight-light">{product.device.price} грн</h2>
                            </div>
                        </Col>
                        {/* <Col hidden={true} id="paybutton">
                            <div className="d-flex h-100 flex-row justify-content-end align-items-center">
                                <h6 className="font-weight-light" >PAYMENT SUCCESS</h6>
                            </div>
                            
                        </Col> */}
                        <Col>
                            <div className="d-flex h-100 flex-row justify-content-end align-items-center">
                                <GooglePayButton//
                                    environment="TEST"
                                    paymentRequest={{
                                        apiVersion: 2,
                                        apiVersionMinor: 0,
                                        allowedPaymentMethods: [{
                                            type: "CARD",
                                            parameters: {
                                                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                                allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                            },
                                            tokenizationSpecification: {
                                                type: 'PAYMENT_GATEWAY',
                                                parameters: {
                                                    gateway: 'example',
                                                    gatewayMerchantId: 'exampleGateWayMerchantId',
                                                }
                                            }
                                        },],
                                        merchantInfo: {
                                            merchantId: '12345678901234567890',
                                            merchantName: 'Demo name',
                                        },
                                        transactionInfo: {
                                            totalPriceStatus: 'FINAL',
                                            totalPriceLabel: 'Total',
                                            totalPrice: product.device.price,
                                            currencyCode: 'UAH',
                                            countryCode: 'UA',
                                        },
                                        shippingAddressRequired: true,
                                        callbackIntents: ['SHIPPING_ADDRESS', 'PAYMENT_AUTHORIZATION'],
                                    }}
                                    onLoadPaymentData={paymentRequest => {
                                        console.log('success', paymentRequest);////////////////////////
                                    }}
                                    onPaymentAuthorized={paymentData =>{
                                        console.log('Payment Authorised Success', paymentData)
                                        return {transactionState: 'SUCCESS'}
                                    }}
                                    onPaymentDataChanged={paymentData =>{
                                        console.log('On Payment Data Changed', paymentData)
                                        return {}
                                    }}
                                    existingPaymentMethodRequired='false'
                                    buttonColor='black'
                                    buttonType='Pay'
                                />
                            </div>
                            
                        </Col>
                    </Row>

                </Card>
            )}
        </Container>
    );
});

export default Basket;


// function App(){
//   return(
//     <div className="App">
//       <h1>
        
//       </h1>
//     </div>
//   )
// }
// export default App;