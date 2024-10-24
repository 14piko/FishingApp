﻿using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace FishingApp.Validations
{
    /// <summary>
    /// Custom validation attribute for validating Croatian OIB (Personal Identification Number).
    /// It checks if the OIB is in the correct format (11 digits) and performs a checksum validation.
    /// </summary>
    public class OibValidator : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value == null)
            {
                return ValidationResult.Success;
            }
            var oib = (string)value;
            if (oib.Length == 0)
            {
                return ValidationResult.Success;
            }
            return IsValidOIB(oib) ? ValidationResult.Success : new ValidationResult("Invalid OIB format!"); ;
        }

        public static bool IsValidOIB(string oib)
        {
            if (string.IsNullOrEmpty(oib) || !Regex.IsMatch(oib, "^[0-9]{11}$"))
                return false;
            var oibSpan = oib.AsSpan();
            var a = 10;
            for (var i = 0; i < 10; i++)
            {
                a += int.Parse(oibSpan.Slice(i, 1));
                a %= 10;
                if (a == 0)
                    a = 10;
                a *= 2;
                a %= 11;
            }
            var kontrolni = 11 - a;
            if (kontrolni == 10)
                kontrolni = 0;
            return kontrolni == int.Parse(oibSpan.Slice(10, 1));
        }
    }
}