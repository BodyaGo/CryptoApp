import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Row, Col, Select } from 'antd';
import millify from 'millify';
import HTMLReactParser from 'html-react-parser';
import { fetchCoinDetails, fetchCoinHistory } from '../service/cryptoApi';
import LineChart from './LineChart';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState('7d');
  const { data, isFetching } = fetchCoinDetails(coinId);
  const { data: coinHistory } = fetchCoinHistory({ coinId, timePeriod });

  const cryptoDetails = data?.data?.coin;

  useEffect(() => {
    setTimePeriod('7d');
  }, []);

  const timePeriods = ['24h', '7d', '30d', '1y', '5y'];

  const handleChange = (value) => {
    setTimePeriod(value);
  };

  if (isFetching) return 'Loading...';

  return (
    <div>
      <Row className='crypto-details-header'>
        <Col xs={24} sm={24} md={16}>
          <Title level={2} className='crypto-details-heading'>
            {cryptoDetails.name} ({cryptoDetails.slug}) Price
          </Title>
          <Text>{cryptoDetails.description && HTMLReactParser(cryptoDetails.description)}</Text>
        </Col>
        <Col xs={24} sm={24} md={8} className='crypto-details-select'>
          <Select defaultValue='7d' onChange={handleChange}>
            {timePeriods.map((period) => (
              <Option key={period} value={period}>
                {period}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Row gutter={[32, 32]} className='crypto-details-stats'>
        <Col xs={24} sm={12} md={8} className='crypto-details-stat'>
          <Title level={3}>${millify(cryptoDetails.price)}</Title>
          <Text>Price</Text>
        </Col>
        <Col xs={24} sm={12} md={8} className='crypto-details-stat'>
          <Title level={3}>{millify(cryptoDetails.rank)}</Title>
          <Text>Rank</Text>
        </Col>
        <Col xs={24} sm={12} md={8} className='crypto-details-stat'>
          <Title level={3}>{millify(cryptoDetails.volume)}</Title>
          <Text>24h Volume</Text>
        </Col>
        <Col xs={24} sm={12} md={8} className='crypto-details-stat'>
          <Title level={3}>{millify(cryptoDetails.marketCap)}</Title>
          <Text>Market Cap</Text>
        </Col>
        <Col xs={24} sm={12} md={8} className='crypto-details-stat'>
          <Title level={3}>{cryptoDetails.allTimeHigh.price ? millify(cryptoDetails.allTimeHigh.price) : '-'}</Title>
          <Text>All-time high (ATH)</Text>
        </Col>
      </Row>
      <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name} />
    </div>
  );
};

export default CryptoDetails;
