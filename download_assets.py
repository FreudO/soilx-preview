#!/usr/bin/env python3
"""Download audio and PDF assets from soilx.wpi.edu into local folders."""

from pathlib import Path
import urllib.request

ROOT = Path(__file__).resolve().parent

ASSETS = [
    (
        "https://soilx.wpi.edu/wp-content/uploads/2023/08/New-Recording-18.m4a",
        "audio/field_interview_1.m4a",
    ),
    (
        "https://soilx.wpi.edu/wp-content/uploads/2023/07/New-Recording-17.m4a",
        "audio/field_interview_2.m4a",
    ),
    (
        "https://soilx.wpi.edu/wp-content/uploads/2023/08/recording1.m4a",
        "audio/field_interview_3.m4a",
    ),
    (
        "https://soilx.wpi.edu/wp-content/uploads/2024/09/Letter_Noushin_FDTD-Medium-Dimension-Selection-Guidelines.pdf",
        "pdfs/fdtd_medium_dimension_guidelines.pdf",
    ),
    (
        "https://soilx.wpi.edu/wp-content/uploads/2024/11/Advancing_Precision_Agriculture_Machine_Learning-Enhanced_GPR_Analysis_for_Root-Zone_Soil_Moisture_Assessment_in_Mega_Farms.pdf",
        "pdfs/advancing_precision_agriculture_gpr_ml.pdf",
    ),
    (
        "https://soilx.wpi.edu/wp-content/uploads/2024/09/WISEE_Noushin_Soil-Subsurface-Channel-Statistical-Characterization.pdf",
        "pdfs/wisee2024_soil_subsurface_channel_characterization.pdf",
    ),
    (
        "https://soilx.wpi.edu/wp-content/uploads/2024/09/Saeed_Haghniaz_Jahromi_IEEE_WISEE_2024.pdf",
        "pdfs/wisee2024_intelligent_adaptive_airborne_gpr.pdf",
    ),
    (
        "https://soilx.wpi.edu/wp-content/uploads/2023/08/Comprehensive_GPR_Signal_Analysis.pdf",
        "pdfs/wisee2023_comprehensive_gpr_signal_analysis.pdf",
    ),
    (
        "https://soilx.wpi.edu/wp-content/uploads/2023/08/Soil_Water_Content_Estimation.pdf",
        "pdfs/orss2023_soil_water_content_estimation.pdf",
    ),
    (
        "https://soilx.wpi.edu/wp-content/uploads/2023/09/IEEE-ORSS-2023_BI_Award.pdf",
        "pdfs/orss2023_best_paper_award.pdf",
    ),
]


def main() -> None:
    for url, rel_path in ASSETS:
        dest = ROOT / rel_path
        dest.parent.mkdir(parents=True, exist_ok=True)
        print(f"Downloading {rel_path} ...")
        urllib.request.urlretrieve(url, dest)
        size_kb = dest.stat().st_size / 1024
        print(f"  OK ({size_kb:.1f} KB)")
    print("\nDone. Commit with:")
    print("  git add audio/ pdfs/ media.html publications.html")
    print('  git commit -m "Add local audio and PDF assets"')


if __name__ == "__main__":
    main()
