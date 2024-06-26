import 'package:flutter/material.dart';
import 'package:wastend/constants/constants.dart';

import 'package:wastend/screens/first_home_page.dart';
import 'package:wastend/screens/map1.dart';
import 'package:wastend/screens/profile_screens/profile_page.dart';

import '../widgets/menu_drawer.dart';

class BottomNavBar extends StatefulWidget {
  const BottomNavBar({super.key});

  @override
  State<BottomNavBar> createState() => _BottomNavBarState();
}

class _BottomNavBarState extends State<BottomNavBar> {
  int _selectedIndex = 0;
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey();
  final List<Widget> screens = [
    const FHomePage(),
    const HomeMap1(),
    const ProfilePage(),
    const SizedBox.shrink(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _scaffoldKey,
      body: screens[_selectedIndex],
      drawer: const MenuDrawer(),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedIndex,
        onTap: (index) {
          if (index == 3) {
            _scaffoldKey.currentState!.openDrawer();
          } else {
            setState(() {
              _selectedIndex = index;
            });
          }
        },
        selectedItemColor: ConstColors.pkColor,
        unselectedItemColor: ConstColors.kGreyColor,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home_filled),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.map_outlined),
            label: 'Map',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person_2_outlined),
            label: 'Profile',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.menu),
            label: 'menu',
          ),
        ],
      ),
    );
  }
}
