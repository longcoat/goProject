import { useLogoutUser } from "../../hooks/mutations/useLogoutUser";
import { useFetchUserLoggedIn } from "../../hooks/queries/useFetchUserLoggedIn";
import * as S from "./LayoutHeader.styles";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import CreaditModal from "../../../units/payment/Creadit.index";
import { userInfoState } from "../../../../commons/stores";
import { useRecoilState } from "recoil";

export default function LayoutHeader() {
  const router = useRouter();
  const { data } = useFetchUserLoggedIn();
  const { logoutUser } = useLogoutUser();
  console.log(data?.fetchUserLoggedIn);
  const [isOpen, setIsOpen] = useState(false);
  const [userInfo] = useRecoilState(userInfoState);
  const handlePayment = () => {
    setIsOpen((prev) => !prev);
  };

  const onClickMain = () => {
    void router.push("/");
  };
  return (
    <>
      <S.Header>
        <S.LogoWrapper onClick={onClickMain}>
          <S.LogoImg src="/DINGCOlogo.png" />
        </S.LogoWrapper>
        <S.ButtonWrapper>
          {data?.fetchUserLoggedIn.name ? (
            <S.Info>
              <S.Name>{data?.fetchUserLoggedIn.name}</S.Name>
              <S.Nim>님 포인트</S.Nim>
              <S.Point>{data?.fetchUserLoggedIn.userPoint?.amount}</S.Point>
              <S.P>P</S.P>
            </S.Info>
          ) : (
            <>
              <Link href={"/login"}>
                <S.Text>로그인</S.Text>
              </Link>
            </>
          )}
          <>
            {data?.fetchUserLoggedIn.name ? (
              <>
                <S.ChargePoint onClick={handlePayment}>충전</S.ChargePoint>
              </>
            ) : (
              <></>
            )}
          </>
          <>
            {data?.fetchUserLoggedIn.name ? (
              <>
                <S.Logout onClick={logoutUser}>로그아웃</S.Logout>
              </>
            ) : (
              <>
                <Link href={"/join"}>
                  <S.Text>회원가입</S.Text>
                </Link>
              </>
            )}
          </>
          <S.Text>장바구니</S.Text>
          <S.CountWrapper>
            <S.CountImg src="/redcircle.png" />
            <S.CountNumber>0</S.CountNumber>
          </S.CountWrapper>
        </S.ButtonWrapper>
      </S.Header>
      <CreaditModal
        isOpen={isOpen}
        infoUser={userInfo}
        setIsOpen={setIsOpen}
        handleCradit={handlePayment}
      />
    </>
  );
}
