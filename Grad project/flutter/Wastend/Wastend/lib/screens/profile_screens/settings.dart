import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:wastend/constants/constants.dart';
import 'package:wastend/screens/payment_methods/save_payment_method.dart';
import 'package:wastend/screens/profile_screens/change_password.dart';

import 'package:wastend/widgets/custom_list_tile.dart';

class Settings extends StatelessWidget {
  const Settings({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Settings'),
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          children: [
            const Divider(
              color: ConstColors.kDarkGrey,
            ),
            const Gap(30),
            CustomListTile(
              icon: Icons.key_sharp,
              title: 'Change password',
              onTap: () {
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (builder) => const ChangePassword()));
              },
            ),
            const Gap(30),
            CustomListTile(
              icon: Icons.payment_rounded,
              title: 'Payment Methods',
              onTap: () {
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => const SavePaymentMethod()));
              },
            ),
          ],
        ),
      ),
    );
  }
}
