import React from "react";
import reactStringReplace from "react-string-replace";
import styled from "styled-components";
import { Property } from "../interfaces";
import { USDFormat } from "../utils/helpers";
import Image from 'next/image'

type ListingAdCardProps = {
  data: Property
}

const Wrapper = styled.div`
  font-style: normal;
  text-align: center;
  max-width: 544px;
  position: relative;
  box-shadow: 0px 4px 16px rgba(11, 17, 52, 0.2);
  border-radius: 4px;
`

const MainPicWrapper = styled.div`
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 544px;
  height: 272px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 17px;
  border-radius: 4px 4px 0px 0px;

  &:hover {
    box-shadow: 0 0 200px rgba(0, 0, 0, 0.8) inset;
    cursor: pointer;
  }

  .arrow {
    width: 16px;
    height: 28px;
  }
`

const LaunchingSoonFlag = styled(Image)`
  position: absolute;
  top: 6px;
  left: -4px;
  width: 134px;
  height: auto;
`

const MainContent  = styled.div`
  padding: 24px;
`

const ContentHeader  = styled.div`
  display: flex;
  justify-content: space-between;

  .titleSection {
    display: flex;
    align-items: center;

    .titleIconWrapper {
      background-color: #98bafc;
      border-radius: 12px;
      justify-content: center;
      align-items: center;
      padding: 9px 10px 5px;
    }

    .buildingIcon {
      width: 22px;
      height: 22px;
      
      @media screen and (max-width: 500px) {
        width: 20px;
        height: 20px;
      }
    }

    .titleWrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      margin-left: 16px;

      .title {
        font-size: 23px;
        margin: 0;
        margin-bottom: 4px;
        font-weight: 500;
        color: #1a2258;

        @media screen and (max-width: 500px) {
          font-size: 16px;
        }
      }
    }
  }

  .priceWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    margin-left: 16px;
    
    @media screen and (max-width: 500px) {
      display: none;
    }
  }
`

const Configuration  = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  margin-top: 12px;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #1a2258;

  @media screen and (max-width: 500px) {
    font-size: 14px;
  }
`

const PriceWrapperMobile  = styled.div`
  display: none;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  margin-top: 12px;

  .psf {
    font-size: 16px;
  }
  
  @media screen and (max-width: 500px) {
    display: flex;
  }
`

const DescriptionToggleWrapper  = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`

const DescriptionWrapper  = styled.div`
`

const SubText = styled.span`
  font-size: 12px;
`

const PSF = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 19px;
  line-height: 26px;
  color: #1a2258;

  @media screen and (max-width: 345px) {
    font-size: 14px;
  }
`

const DescriptionToggle  = styled.button`
  background-color: transparent;
  border: 0;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  font-weight: 600;
  color: #216bff;
  padding: 0;
  cursor: pointer;
`

const Description  = styled.p`
  font-size: 14px;

  @media screen and (max-width: 500px) {
    font-size: 12px;
  }
`

const ListingAdCard = ({ data }: ListingAdCardProps) => {
  const {
    pic,
    title,
    address,
    psf_min,
    psf_max,
    subprice_label,
    project_type,
    year,
    ownership_type,
    availabilities_label,
    description
  } = data;
  const launchingPageFlag = require("../assets/images/Flag.png");
  const arrowRight = require("../assets/icons/chevron-right.png");
  const arrowLeft = require("../assets/icons/chevron-left.png");
  const buildingIcon = require("../assets/icons/building.png");

  const [showDescription, setShowDescription] = React.useState(true);
  const [showArrow, setShowArrow] = React.useState(false);
  const [secureDescription, setSecureDescription] = React.useState<string | React.ReactNodeArray>(description);
  const [phoneNumbers, setPhoneNumbers] = React.useState([]);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const togglePhoneNumber = (key) => {
    setPhoneNumbers(
      phoneNumbers.map((phoneNumber, i) => ({
        ...phoneNumber,
        hideReal: key === i ? !phoneNumber.hideReal : phoneNumber.hideReal
      }))
    );
  };

  React.useEffect(() => {
    setShowDescription(false);
  }, []);

  React.useEffect(() => {
    const regexp = new RegExp(
      "\\+?\\(?\\d*\\)? ?\\(?\\d+\\)?\\d*([\\s./-]?\\d{2,})+",
      "g"
    );
    const phone_numbers = [...description.matchAll(regexp)];

    setPhoneNumbers(
      phone_numbers
        .filter((item) => item[0].length > 7)
        .map((item) => ({
          real: item[0],
          secured: item[0].replace(/\d{4}$/, "XXXX"),
          hideReal: true
        }))
    );
  }, [description]);

  React.useEffect(() => {
    let newDescription: string | React.ReactNodeArray = description;

    phoneNumbers.forEach((phoneNumber, key) => {
      newDescription = reactStringReplace(
        newDescription,
        phoneNumber.real,
        () => (
          <span key={key} onClick={() => togglePhoneNumber(key)}>
            {phoneNumbers[key]?.hideReal
              ? phoneNumbers[key]?.secured
              : phoneNumbers[key]?.real}
          </span>
        )
      );
    });
    newDescription = reactStringReplace(newDescription, "\n", () => <br />);
    newDescription && setSecureDescription(newDescription);
  }, [phoneNumbers]);

  return (
    <Wrapper>
      <MainPicWrapper
        className="mainPic"
        style={{
          backgroundImage: `url(${pic})`
        }}
        onMouseEnter={() => setShowArrow(true)}
        onMouseLeave={() => setShowArrow(false)}
      >
        <Image
          className="arrow"
          style={{ display: showArrow ? "block" : "none" }}
          src={arrowLeft}
          alt="arrowLeft"
        />
        <Image
          className="arrow"
          style={{ display: showArrow ? "block" : "none" }}
          src={arrowRight}
          alt="arrowRight"
        />
      </MainPicWrapper>
      <LaunchingSoonFlag
        className="launchingSoonFlag"
        src={launchingPageFlag}
        alt="launchingsoon"
      />
      <MainContent>
        <ContentHeader>
          <div className="titleSection">
            <div className="titleIconWrapper">
              <Image className="buildingIcon" src={buildingIcon} alt="building" />
            </div>
            <div className="titleWrapper">
              <h1 className="title">{title}</h1>
              <SubText>{address}</SubText>
            </div>
          </div>
          <div className="priceWrapper">
            <PSF className="psf">
              {USDFormat(psf_min)} - {USDFormat(psf_max)} psf
            </PSF>
            <SubText>{subprice_label}</SubText>
          </div>
        </ContentHeader>
        <Configuration>
          <span>
            {project_type} · {year} · {ownership_type}
          </span>
          <span>{availabilities_label}</span>
        </Configuration>
        <PriceWrapperMobile>
          <PSF className="psf">
            {USDFormat(psf_min)} - {USDFormat(psf_max)} psf
          </PSF>
          <SubText>{subprice_label}</SubText>
        </PriceWrapperMobile>
        <DescriptionToggleWrapper>
          <DescriptionToggle onClick={toggleDescription}>
            {showDescription ? "Hide" : "See"} description
          </DescriptionToggle>
        </DescriptionToggleWrapper>
        <DescriptionWrapper>
          {showDescription ? (
            <Description>{secureDescription}</Description>
          ) : null}
        </DescriptionWrapper>
      </MainContent>
    </Wrapper>
  );
}

export default ListingAdCard
