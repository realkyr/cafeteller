import { Col, Row, Select } from 'antd'
import React from 'react'
import styled from 'styled-components'

const MapHeader = styled.div`
  box-shadow: 0 2px 6px 0 rgb(0 0 0 / 20%);
  padding: 15px;
  background: #f5f1eb;
  z-index: 1;
  position: relative;

  .ant-row {
    margin-bottom: 0 !important;
  }
`

const MapHeaderSearch = ({ className }: { className: string }) => {
  return (
    <MapHeader className={className}>
      <div>
        <Row gutter={[16, 12]} justify='center'>
          <Col span={12}>
            <Select
              showSearch
              onChange={(id) => {
                // if (id) {
                //   const selectedMarker = reviews[id].marker
                //   this.clearMarkers()
                //   this.displaySelectedMarkers([selectedMarker])
                //   map.panTo(selectedMarker.getPosition())
                //   map.setZoom(15)
                //   this.setState({
                //     filteredReviews: [id]
                //   })
                // } else {
                //   this.displayAllMarkers(markers, map)
                //   this.setMapVisibleToMarker(map, markers)
                //   this.setState({
                //     filteredReviews: [...Object.keys(reviews)]
                //   })
                // }
              }}
              allowClear
              optionFilterProp='children'
              placeholder='ค้นหาด้วยชื่อคาเฟ่'
              style={{ width: '100%' }}
            >
              {/*{Object.keys(reviews).map((r) => (*/}
              {/*  <Option value={r} key={r}>*/}
              {/*    {reviews[r].cafe.name}*/}
              {/*  </Option>*/}
              {/*))}*/}
            </Select>
          </Col>
          <Col span={12}>
            <Select
              showSearch
              onChange={
                // (selectedTypes) =>
                // this.setState({ selectedTypes }, this.filterProvince)
                () => {}
              }
              mode='multiple'
              allowClear
              maxTagCount='responsive'
              optionFilterProp='children'
              placeholder='ค้นหาด้วยประเภท'
              style={{ width: '100%' }}
            >
              {/*{*/}
              {/*  types.map(*/}
              {/*    r => (<Option value={r.value} key={r.key}>{r.value}</Option>)*/}
              {/*  )*/}
              {/*}*/}
            </Select>
          </Col>
          <Col xs={12}>
            <Select
              mode='multiple'
              maxTagCount='responsive'
              allowClear
              onChange={(selectedChangwats) => {
                // this.setState({ selectedChangwats }, this.filterProvince)
              }}
              style={{ width: '100%' }}
              optionFilterProp='children'
              placeholder='ค้นหาด้วยจังหวัด'
              optionLabelProp='label'
            >
              {/*{*/}
              {/*  Object.keys(changwats).map(changwatId => (*/}
              {/*    <Option*/}
              {/*      key={changwatId}*/}
              {/*      value={changwats[changwatId].name.th}*/}
              {/*      label={changwats[changwatId].name.th}*/}
              {/*    >*/}
              {/*      {*/}
              {/*        changwats[changwatId].name.th*/}
              {/*      }*/}
              {/*    </Option>*/}
              {/*  ))*/}
              {/*}*/}
            </Select>
          </Col>
          <Col xs={12}>
            <Select
              mode='multiple'
              allowClear
              maxTagCount='responsive'
              style={{ width: '100%' }}
              onChange={(selectedAmphoes) => {
                // this.setState({ selectedAmphoes }, this.filterProvince)
              }}
              optionFilterProp='children'
              placeholder='ค้นหาด้วยอำเภอ/เขต'
              optionLabelProp='label'
            >
              {/*{*/}
              {/*  Object.keys(amphoes)*/}
              {/*    .filter(amphoeId => {*/}
              {/*      const { selectedChangwats } = this.state*/}
              {/*      const province = changwats[amphoes[amphoeId].changwat_id].name.th*/}
              {/*      if (!isArrayExist(selectedChangwats)) return true*/}
              {/*      return selectedChangwats.includes(province)*/}
              {/*    })*/}
              {/*    .map(amphoe => (*/}
              {/*      <Option key={amphoe} value={amphoes[amphoe].name.th} label={amphoes[amphoe].name.th}>*/}
              {/*        {*/}
              {/*          changwats[amphoes[amphoe].changwat_id].name.th +*/}
              {/*          ' -> ' +*/}
              {/*          amphoes[amphoe].name.th*/}
              {/*        }*/}
              {/*      </Option>*/}
              {/*    ))*/}
              {/*}*/}
            </Select>
          </Col>
          {/* <SearchOutlined className="searchBox-icon" /> */}
        </Row>
      </div>
    </MapHeader>
  )
}

export default MapHeaderSearch
