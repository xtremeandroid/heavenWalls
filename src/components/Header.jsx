import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  HStack,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useMediaQuery,
} from "@chakra-ui/react";
import {
  FaUser,
  FaHome,
  FaRandom,
  FaSearch,
  FaHeart,
  FaStar,
} from "react-icons/fa";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [isSmallerThanMd] = useMediaQuery("(max-width: 768px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HStack
      p="4"
      shadow="base"
      bgColor="blackAlpha.900"
      justifyContent={"space-evenly"}
      alignItems="center"
    >
      {isSmallerThanMd ? (
        <>
          <Button variant="unstyled" color="white">
            <Link to="/">
              <span style={{ display: "flex", alignItems: "center" }}>
                <FaHome style={{ marginRight: "8px" }} /> {"Home"}
              </span>
            </Link>
          </Button>

          <Button variant="unstyled" color="white">
            <Link to="/search">
              <span style={{ display: "flex", alignItems: "center" }}>
                <FaSearch style={{ marginRight: "8px" }} /> {"Search"}
              </span>
            </Link>
          </Button>

          <Box>
            {userInfo ? (
              <Menu>
                <MenuButton as={Button} variant="unstyled" color="white">
                  <FaUser />
                </MenuButton>
                <MenuList>
                  <MenuItem as={Link} to="/profile">
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Button variant="unstyled" color="white">
                <Link to="/login">
                  <span style={{ display: "flex", alignItems: "center" }}>
                    <FaUser style={{ marginRight: "8px" }} /> {"Sign in"}
                  </span>
                </Link>
              </Button>
            )}
          </Box>

          <MobileNav userInfo={userInfo} handleLogout={handleLogout} />
        </>
      ) : (
        <>
          <Button variant="unstyled" color="white">
            <Link to="/">
              <span style={{ display: "flex", alignItems: "center" }}>
                <FaHome style={{ marginRight: "8px" }} /> {"Home"}
              </span>
            </Link>
          </Button>

          <Button variant="unstyled" color="white">
            <Link to="/top">
              <span style={{ display: "flex", alignItems: "center" }}>
                <FaHeart style={{ marginRight: "8px" }} /> {"Top Rated"}
              </span>
            </Link>
          </Button>
          <Button variant="unstyled" color="white">
            <Link to="/latest">
              <span style={{ display: "flex", alignItems: "center" }}>
                <FaStar style={{ marginRight: "8px" }} /> {"Latest"}
              </span>
            </Link>
          </Button>
          <Button variant="unstyled" color="white">
            <Link to="/random">
              <span style={{ display: "flex", alignItems: "center" }}>
                <FaRandom style={{ marginRight: "8px" }} /> {"Random"}
              </span>
            </Link>
          </Button>
          <Button variant="unstyled" color="white">
            <Link to="/search">
              <span style={{ display: "flex", alignItems: "center" }}>
                <FaSearch style={{ marginRight: "8px" }} /> {"Search"}
              </span>
            </Link>
          </Button>

          <Box>
            {userInfo ? (
              <Menu>
                <MenuButton as={Button} variant="unstyled" color="white">
                  <span style={{ display: "flex", alignItems: "center" }}>
                    <FaUser style={{ marginRight: "8px" }} /> {userInfo.name}
                  </span>
                </MenuButton>

                <MenuList>
                  <MenuItem as={Link} to="/profile">
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Button variant="unstyled" color="white">
                <Link to="/login">
                  <span style={{ display: "flex", alignItems: "center" }}>
                    <FaUser style={{ marginRight: "8px" }} /> {"Sign in"}
                  </span>
                </Link>
              </Button>
            )}
          </Box>
        </>
      )}
    </HStack>
  );
};

const MobileNav = ({ userInfo, handleLogout }) => (
  <Box>
    <Menu>
      <MenuButton as={Button} variant="unstyled" color="white">
        ☰
      </MenuButton>
      <MenuList>
        <MenuItem as={Link} to="/top">
          TopList
        </MenuItem>
        <MenuItem as={Link} to="/latest">
          Latest
        </MenuItem>
        <MenuItem as={Link} to="/random">
          Random
        </MenuItem>
      </MenuList>
    </Menu>
  </Box>
);

export default Header;
