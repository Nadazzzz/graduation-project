import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:wastend/constants/constants.dart';
import 'package:wastend/screens/payment_methods/payment_card_details.dart';
import 'package:wastend/widgets/custom_payment_cont.dart';

class AddPaymentMethod extends StatelessWidget {
  const AddPaymentMethod({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Payment Methods',
          style: TextStyle(
              color: ConstColors.kDarkGrey, fontWeight: FontWeight.w500),
        ),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(12),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Gap(20),
              Text(
                '   Add Payment Method',
                style: ConstFonts.fontBold.copyWith(fontSize: 18),
              ),
              const Gap(20),
              Container(
                width: 400,
                padding: const EdgeInsets.only(left: 13),
                child: const Text(
                  'You haven’t added any payment cards yet.Youcan add a card to your account when making a purchase.',
                  style: TextStyle(fontSize: 16, color: ConstColors.kDarkGrey),
                  softWrap: true,
                  textScaler: TextScaler.linear(1.01),
                  textAlign: TextAlign.start,
                ),
              ),
              const Gap(40),
              const Padding(
                padding: EdgeInsets.only(left: 13.0),
                child: Text(
                  'We also support the following methods at checkout',
                  style: TextStyle(fontSize: 15, color: ConstColors.kDarkGrey),
                ),
              ),
              const Gap(30),
              CustomPaymentContainer(
                onTap: () {
                  Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => const PaymentCardDetails()));
                },
                donateImage: 'assets/images/ion_card.png',
                hintText: '       Add Credit Card',
                suffixIcon: const Icon(
                  Icons.arrow_forward_ios,
                  color: ConstColors.kGreyColor,
                  size: 20,
                ),
              ),
              const Gap(25),
              CustomPaymentContainer(
                onTap: () {
                  Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => const PaymentCardDetails()));
                },
                donateImage: 'assets/images/formkit_visa.png',
                hintText: '         Vise',
                suffixIcon: const Icon(
                  Icons.arrow_forward_ios,
                  color: ConstColors.kGreyColor,
                  size: 20,
                ),
              ),
              const Gap(25),
              CustomPaymentContainer(
                onTap: () {
                  Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => const PaymentCardDetails()));
                },
                donateImage: 'assets/images/logos_mastercard.png',
                hintText: '          Master card',
                suffixIcon: const Icon(
                  Icons.arrow_forward_ios,
                  color: ConstColors.kGreyColor,
                  size: 20,
                ),
              ),
              const Gap(25),
              CustomPaymentContainer(
                onTap: () {
                  Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => const PaymentCardDetails()));
                },
                donateImage: 'assets/images/logos_google-pay.png',
                hintText: '           Google Pay',
                suffixIcon: const Icon(
                  Icons.arrow_forward_ios,
                  color: ConstColors.kGreyColor,
                  size: 20,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
