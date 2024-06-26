import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:input_quantity/input_quantity.dart';
import 'package:wastend/constants/constants.dart';
import 'package:wastend/screens/payment_methods/save_payment_method.dart';

import '../utils/constants.dart';
import 'payment_methods/payment_success1.dart';

class ReservePage extends StatefulWidget {
  const ReservePage({super.key, this.mealbyId});
  final Map<String, dynamic>? mealbyId;

  @override
  State<ReservePage> createState() => _ReservePageState();
}

String? paymentMethods;

class _ReservePageState extends State<ReservePage> {
  double quant = 0;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            const Gap(20),
            Container(
              width: double.infinity,
              height: 350,
              decoration: BoxDecoration(
                  shape: BoxShape.rectangle,
                  borderRadius: const BorderRadius.only(
                    topLeft: Radius.circular(8),
                    topRight: Radius.circular(8),
                  ),
                  image: DecorationImage(
                      image: NetworkImage(
                        "$baseUrl/uploads/" + widget.mealbyId!['mealPhoto'],
                      ),
                      fit: BoxFit.cover)),
            ),
            const Gap(20),
            Text(
              "${widget.mealbyId!['store']['name'] ?? ""}",
              style: ConstFonts.fontBold,
            ),
            Text(
              "${widget.mealbyId!['name'] ?? ""}",
              style: ConstFonts.fontBold,
            ),
            const Gap(7),
            Text(
              '${widget.mealbyId?['pickupDay']}: ${widget.mealbyId!['createdDate']}',
              style: const TextStyle(fontSize: 15, color: ConstColors.kDarkGrey),
            ),
            const Divider(),
            const Gap(10),
            const Text(
              'Select Quantity',
              style: ConstFonts.fontBold,
            ),
            const Gap(15),
            InputQty(
              decoration: const QtyDecorationProps(
                btnColor: ConstColors.pkColor,
                iconColor: ConstColors.kDarkGrey,
                borderShape: BorderShapeBtn.circle,
                border: InputBorder.none,
                minusButtonConstrains:
                    BoxConstraints(minWidth: 40, minHeight: 40),
                plusButtonConstrains:
                    BoxConstraints(minWidth: 40, minHeight: 40),
              ),
              qtyFormProps: const QtyFormProps(
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 24),
                  cursorRadius: Radius.circular(12)),
              maxVal: 100,
              initVal: 0,
              minVal: 0,
              steps: 1,
              onQtyChanged: (val) {
                setState(() {
                  quant = val;
                });
              },
            ),
            const Gap(20),
            const Divider(),
            const Gap(20),
            Padding(
              padding: const EdgeInsets.only(left: 60),
              child: Align(
                alignment: Alignment.centerLeft,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      '${widget.mealbyId!['price'] * quant}\$' 'Subtotal',
                      style: ConstFonts.font400
                          .copyWith(color: ConstColors.kGreyColor),
                    ),
                    const Gap(5),
                    Text(
                      '9\$' 'Delivery tax',
                      style: ConstFonts.font400
                          .copyWith(color: ConstColors.kGreyColor),
                    ),
                    const Gap(5),
                    Text(
                      '${(widget.mealbyId!['price'] * quant) + 9}\$' 'ToTal',
                      style: ConstFonts.font400,
                    ),
                  ],
                ),
              ),
            ),
            const Gap(10),
            const Divider(),
            const Gap(10),
            const Padding(
              padding: EdgeInsets.only(left: 60),
              child: Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  'payment methods',
                  style: ConstFonts.fontBold,
                ),
              ),
            ),
            const Gap(20),
            Padding(
              padding: const EdgeInsets.only(left: 60, right: 30),
              child: Row(
                children: [
                  Text(
                    'Cash',
                    style: ConstFonts.fontBold
                        .copyWith(color: ConstColors.kGreyColor),
                  ),
                  const Spacer(),
                  Radio(
                      activeColor: ConstColors.pkColor,
                      value: "cash",
                      groupValue: paymentMethods,
                      onChanged: (val) {
                        setState(() {
                          paymentMethods = val;
                        });
                        if (paymentMethods == 'cash') {
                          Future.delayed(const Duration(seconds: 1)).then(
                              (value) => Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                      builder: (context) =>
                                          const PaymentSuccess1())));
                        }
                      }),
                ],
              ),
            ),
            const Gap(15),
            Padding(
              padding: const EdgeInsets.only(left: 60, right: 30),
              child: Row(
                children: [
                  Text(
                    'Digital Payment',
                    style: ConstFonts.fontBold
                        .copyWith(color: ConstColors.kGreyColor),
                  ),
                  const Spacer(),
                  Radio(
                      activeColor: ConstColors.pkColor,
                      value: "digitalPayment",
                      groupValue: paymentMethods,
                      onChanged: (val) {
                        setState(() {
                          paymentMethods = val;
                        });
                        if (paymentMethods == 'digitalPayment') {
                          Future.delayed(const Duration(seconds: 1)).then(
                              (value) => Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                      builder: (context) =>
                                          const SavePaymentMethod())));
                        }
                      }),
                ],
              ),
            ),
            const Gap(30),
          ],
        ),
      ),
    );
  }
}
