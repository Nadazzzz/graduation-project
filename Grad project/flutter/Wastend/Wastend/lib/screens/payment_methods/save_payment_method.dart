import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:wastend/constants/constants.dart';
import 'package:wastend/screens/payment_methods/add_payment_method.dart';
import 'package:wastend/screens/payment_methods/payment_success1.dart';
import 'package:wastend/widgets/custom_button.dart';
import 'package:wastend/widgets/custom_payment_cont.dart';

class SavePaymentMethod extends StatelessWidget {
  const SavePaymentMethod({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Payment Methods',
          style: TextStyle(color: ConstColors.kDarkGrey),
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
                '   Saved Payment',
                style: ConstFonts.fontBold.copyWith(fontSize: 18),
              ),
              const Gap(7),
              const CustomPaymentContainer(
                  readOnly: true,
                  donateImage: 'assets/images/ion_card.png',
                  hintText: '                   *  *  *  *  5345'),
              const Gap(20),
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  CircleAvatar(
                    backgroundColor: ConstColors.pkColor,
                    maxRadius: 15,
                    child: IconButton(
                        alignment: Alignment.center,
                        padding: EdgeInsets.zero,
                        onPressed: () {
                          Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) =>
                                      const AddPaymentMethod()));
                        },
                        icon: const Icon(
                          Icons.add,
                          size: 30,
                          color: ConstColors.kWhiteColor,
                        )),
                  ),
                  const Gap(6),
                  const Text(
                    'Add Card',
                    style: ConstFonts.fontBold,
                  )
                ],
              ),
              const Gap(20),
              const Text(
                '    Add Payment Method',
                style: ConstFonts.fontBold,
              ),
              const Gap(15),
              const CustomPaymentContainer(
                readOnly: true,
                donateImage: 'assets/images/ion_card.png',
                hintText: '       Add Credit Card',
                suffixIcon: Icon(
                  Icons.arrow_forward_ios,
                  color: ConstColors.kGreyColor,
                  size: 20,
                ),
              ),
              const Gap(25),
              const CustomPaymentContainer(
                readOnly: true,
                donateImage: 'assets/images/formkit_visa.png',
                hintText: '         Vise',
                suffixIcon: Icon(
                  Icons.arrow_forward_ios,
                  color: ConstColors.kGreyColor,
                  size: 20,
                ),
              ),
              const Gap(25),
              const CustomPaymentContainer(
                readOnly: true,
                donateImage: 'assets/images/logos_mastercard.png',
                hintText: '          Master card',
                suffixIcon: Icon(
                  Icons.arrow_forward_ios,
                  color: ConstColors.kGreyColor,
                  size: 20,
                ),
              ),
              const Gap(25),
              const CustomPaymentContainer(
                readOnly: true,
                donateImage: 'assets/images/logos_google-pay.png',
                hintText: '           Google Pay',
                suffixIcon: Icon(
                  Icons.arrow_forward_ios,
                  color: ConstColors.kGreyColor,
                  size: 20,
                ),
              ),
              const Gap(130),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 25),
                child: CustomButton(
                  onTap: () {
                    Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => const PaymentSuccess1()));
                  },
                  buttonText: 'Confirm',
                  // border: Border.all(),
                  borderRadius: BorderRadius.circular(9),
                  textColor: ConstColors.kWhiteColor,
                  contColor: ConstColors.pkColor,
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}

// ignore: must_be_immutable

