import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from "prop-types";
import BoxPlotChart from "../../charts/boxplot";

const BoxPlotModal = ({ open, onClose }) => {
  const data = [
    {
      "group": "Alpha",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 3.9226369313943987
    },
    {
      "group": "Alpha",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 4.000524478607234
    },
    {
      "group": "Alpha",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 4.301835253832903
    },
    {
      "group": "Alpha",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 4.369706237081971
    },
    {
      "group": "Alpha",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 6.058609790535277
    },
    {
      "group": "Alpha",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 5.5169450913532
    },
    {
      "group": "Alpha",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 5.0669109552415925
    },
    {
      "group": "Alpha",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 6.330720275762898
    },
    {
      "group": "Alpha",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 6.071405231448907
    },
    {
      "group": "Alpha",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 4.772873324874795
    },
    {
      "group": "Alpha",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 3.7888453708004066
    },
    {
      "group": "Alpha",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 5.723232158852857
    },
    {
      "group": "Alpha",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 5.302821714296414
    },
    {
      "group": "Alpha",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 4.614334704030948
    },
    {
      "group": "Alpha",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 5.584348901371147
    },
    {
      "group": "Alpha",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 4.620315992798057
    },
    {
      "group": "Alpha",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 5.383306045111827
    },
    {
      "group": "Alpha",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 5.850784796372139
    },
    {
      "group": "Alpha",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 4.868188952509849
    },
    {
      "group": "Alpha",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 3.736094758944403
    },
    {
      "group": "Alpha",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 1,
      "n": 20,
      "value": 5.095284131149905
    },
    {
      "group": "Alpha",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 1,
      "n": 20,
      "value": 6.766329667149238
    },
    {
      "group": "Alpha",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 1,
      "n": 20,
      "value": 5.674042974030748
    },
    {
      "group": "Alpha",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 1,
      "n": 20,
      "value": 6.034706455431941
    },
    {
      "group": "Alpha",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 1,
      "n": 20,
      "value": 8.172069652950295
    },
    {
      "group": "Alpha",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 1,
      "n": 20,
      "value": 6.816723854445889
    },
    {
      "group": "Alpha",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 1,
      "n": 20,
      "value": 5.935470656375307
    },
    {
      "group": "Alpha",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 1,
      "n": 20,
      "value": 6.409312674046745
    },
    {
      "group": "Alpha",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 1,
      "n": 20,
      "value": 6.908801019402505
    },
    {
      "group": "Alpha",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 1,
      "n": 20,
      "value": 7.112561855486187
    },
    {
      "group": "Alpha",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 1,
      "n": 20,
      "value": 5.783781105978566
    },
    {
      "group": "Alpha",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 1,
      "n": 20,
      "value": 5.9972653284147865
    },
    {
      "group": "Alpha",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 1,
      "n": 20,
      "value": 4.6527110276522565
    },
    {
      "group": "Alpha",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 1,
      "n": 20,
      "value": 4.977968414889357
    },
    {
      "group": "Alpha",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 1,
      "n": 20,
      "value": 5.8486954064519825
    },
    {
      "group": "Alpha",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 1,
      "n": 20,
      "value": 6.927174252335464
    },
    {
      "group": "Alpha",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 1,
      "n": 20,
      "value": 6.268964966181423
    },
    {
      "group": "Alpha",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 1,
      "n": 20,
      "value": 6.116758890034158
    },
    {
      "group": "Alpha",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 1,
      "n": 20,
      "value": 5.573006454298154
    },
    {
      "group": "Alpha",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 1,
      "n": 20,
      "value": 5.43664652374563
    },
    {
      "group": "Beta",
      "subgroup": "Category 1",
      "mu": 8,
      "sd": 1.4,
      "n": 20,
      "value": 7.3694443759804855
    },
    {
      "group": "Beta",
      "subgroup": "Category 1",
      "mu": 8,
      "sd": 1.4,
      "n": 20,
      "value": 8.154254549492217
    },
    {
      "group": "Beta",
      "subgroup": "Category 1",
      "mu": 8,
      "sd": 1.4,
      "n": 20,
      "value": 7.637978225745669
    },
    {
      "group": "Beta",
      "subgroup": "Category 1",
      "mu": 8,
      "sd": 1.4,
      "n": 20,
      "value": 7.9324941369101785
    },
    {
      "group": "Beta",
      "subgroup": "Category 1",
      "mu": 8,
      "sd": 1.4,
      "n": 20,
      "value": 9.039961535109516
    },
    {
      "group": "Beta",
      "subgroup": "Category 1",
      "mu": 8,
      "sd": 1.4,
      "n": 20,
      "value": 6.975210805722931
    },
    {
      "group": "Beta",
      "subgroup": "Category 1",
      "mu": 8,
      "sd": 1.4,
      "n": 20,
      "value": 8.1146522431673
    },
    {
      "group": "Beta",
      "subgroup": "Category 1",
      "mu": 8,
      "sd": 1.4,
      "n": 20,
      "value": 7.97450253245642
    },
    {
      "group": "Beta",
      "subgroup": "Category 1",
      "mu": 8,
      "sd": 1.4,
      "n": 20,
      "value": 6.003665179871698
    },
    {
      "group": "Beta",
      "subgroup": "Category 1",
      "mu": 8,
      "sd": 1.4,
      "n": 20,
      "value": 7.300587306696014
    },
    {
      "group": "Beta",
      "subgroup": "Category 1",
      "mu": 8,
      "sd": 1.4,
      "n": 20,
      "value": 8.504730849932963
    },
    {
      "group": "Beta",
      "subgroup": "Category 1",
      "mu": 8,
      "sd": 1.4,
      "n": 20,
      "value": 7.436866028344421
    },
    {
      "group": "Beta",
      "subgroup": "Category 1",
      "mu": 8,
      "sd": 1.4,
      "n": 20,
      "value": 7.673659125626486
    },
    {
      "group": "Beta",
      "subgroup": "Category 1",
      "mu": 8,
      "sd": 1.4,
      "n": 20,
      "value": 8.912821155702506
    },
    {
      "group": "Beta",
      "subgroup": "Category 1",
      "mu": 8,
      "sd": 1.4,
      "n": 20,
      "value": 6.541631625437986
    },
    {
      "group": "Beta",
      "subgroup": "Category 1",
      "mu": 8,
      "sd": 1.4,
      "n": 20,
      "value": 8.66402225215867
    },
    {
      "group": "Beta",
      "subgroup": "Category 1",
      "mu": 8,
      "sd": 1.4,
      "n": 20,
      "value": 7.205163757013894
    },
    {
      "group": "Beta",
      "subgroup": "Category 1",
      "mu": 8,
      "sd": 1.4,
      "n": 20,
      "value": 9.388586514417513
    },
    {
      "group": "Beta",
      "subgroup": "Category 1",
      "mu": 8,
      "sd": 1.4,
      "n": 20,
      "value": 9.332567769102246
    },
    {
      "group": "Beta",
      "subgroup": "Category 1",
      "mu": 8,
      "sd": 1.4,
      "n": 20,
      "value": 8.222250187037101
    },
    {
      "group": "Beta",
      "subgroup": "Category 2",
      "mu": 7.5,
      "sd": 1.4,
      "n": 20,
      "value": 7.120506166518127
    },
    {
      "group": "Beta",
      "subgroup": "Category 2",
      "mu": 7.5,
      "sd": 1.4,
      "n": 20,
      "value": 8.453455372053845
    },
    {
      "group": "Beta",
      "subgroup": "Category 2",
      "mu": 7.5,
      "sd": 1.4,
      "n": 20,
      "value": 8.196801254004333
    },
    {
      "group": "Beta",
      "subgroup": "Category 2",
      "mu": 7.5,
      "sd": 1.4,
      "n": 20,
      "value": 4.6109896370487755
    },
    {
      "group": "Beta",
      "subgroup": "Category 2",
      "mu": 7.5,
      "sd": 1.4,
      "n": 20,
      "value": 8.165128001293091
    },
    {
      "group": "Beta",
      "subgroup": "Category 2",
      "mu": 7.5,
      "sd": 1.4,
      "n": 20,
      "value": 7.46056669461924
    },
    {
      "group": "Beta",
      "subgroup": "Category 2",
      "mu": 7.5,
      "sd": 1.4,
      "n": 20,
      "value": 9.166691139119854
    },
    {
      "group": "Beta",
      "subgroup": "Category 2",
      "mu": 7.5,
      "sd": 1.4,
      "n": 20,
      "value": 8.147980765474847
    },
    {
      "group": "Beta",
      "subgroup": "Category 2",
      "mu": 7.5,
      "sd": 1.4,
      "n": 20,
      "value": 7.750097098563851
    },
    {
      "group": "Beta",
      "subgroup": "Category 2",
      "mu": 7.5,
      "sd": 1.4,
      "n": 20,
      "value": 7.794694489808486
    },
    {
      "group": "Beta",
      "subgroup": "Category 2",
      "mu": 7.5,
      "sd": 1.4,
      "n": 20,
      "value": 5.1539794172648605
    },
    {
      "group": "Beta",
      "subgroup": "Category 2",
      "mu": 7.5,
      "sd": 1.4,
      "n": 20,
      "value": 7.819882595702154
    },
    {
      "group": "Beta",
      "subgroup": "Category 2",
      "mu": 7.5,
      "sd": 1.4,
      "n": 20,
      "value": 6.021388610063431
    },
    {
      "group": "Beta",
      "subgroup": "Category 2",
      "mu": 7.5,
      "sd": 1.4,
      "n": 20,
      "value": 6.415618218782993
    },
    {
      "group": "Beta",
      "subgroup": "Category 2",
      "mu": 7.5,
      "sd": 1.4,
      "n": 20,
      "value": 7.362519680418717
    },
    {
      "group": "Beta",
      "subgroup": "Category 2",
      "mu": 7.5,
      "sd": 1.4,
      "n": 20,
      "value": 6.18112611154536
    },
    {
      "group": "Beta",
      "subgroup": "Category 2",
      "mu": 7.5,
      "sd": 1.4,
      "n": 20,
      "value": 8.209777226907962
    },
    {
      "group": "Beta",
      "subgroup": "Category 2",
      "mu": 7.5,
      "sd": 1.4,
      "n": 20,
      "value": 5.581007494061298
    },
    {
      "group": "Beta",
      "subgroup": "Category 2",
      "mu": 7.5,
      "sd": 1.4,
      "n": 20,
      "value": 7.090495053813845
    },
    {
      "group": "Beta",
      "subgroup": "Category 2",
      "mu": 7.5,
      "sd": 1.4,
      "n": 20,
      "value": 8.30920974914717
    },
    {
      "group": "Gamma",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 4.783956071632946
    },
    {
      "group": "Gamma",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 3.865817983161821
    },
    {
      "group": "Gamma",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 5.23684185331532
    },
    {
      "group": "Gamma",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 3.797314045792836
    },
    {
      "group": "Gamma",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 4.675932117648815
    },
    {
      "group": "Gamma",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 4.8295186454368615
    },
    {
      "group": "Gamma",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 4.685170781721826
    },
    {
      "group": "Gamma",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 5.3090044327602905
    },
    {
      "group": "Gamma",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 4.379469859863716
    },
    {
      "group": "Gamma",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 5.438667449210814
    },
    {
      "group": "Gamma",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 5.037155082078907
    },
    {
      "group": "Gamma",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 4.519601553093066
    },
    {
      "group": "Gamma",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 5.586949404888395
    },
    {
      "group": "Gamma",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 5.652317748235107
    },
    {
      "group": "Gamma",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 5.340145791592285
    },
    {
      "group": "Gamma",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 5.528874035861723
    },
    {
      "group": "Gamma",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 4.00156976668921
    },
    {
      "group": "Gamma",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 4.9014713064955
    },
    {
      "group": "Gamma",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 3.9056031860545195
    },
    {
      "group": "Gamma",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 4.028513758979748
    },
    {
      "group": "Gamma",
      "subgroup": "Category 2",
      "mu": 7.2,
      "sd": 1.8,
      "n": 20,
      "value": 9.063613248283833
    },
    {
      "group": "Gamma",
      "subgroup": "Category 2",
      "mu": 7.2,
      "sd": 1.8,
      "n": 20,
      "value": 6.782802262430504
    },
    {
      "group": "Gamma",
      "subgroup": "Category 2",
      "mu": 7.2,
      "sd": 1.8,
      "n": 20,
      "value": 6.430015457667197
    },
    {
      "group": "Gamma",
      "subgroup": "Category 2",
      "mu": 7.2,
      "sd": 1.8,
      "n": 20,
      "value": 7.595257645985028
    },
    {
      "group": "Gamma",
      "subgroup": "Category 2",
      "mu": 7.2,
      "sd": 1.8,
      "n": 20,
      "value": 7.626729300591391
    },
    {
      "group": "Gamma",
      "subgroup": "Category 2",
      "mu": 7.2,
      "sd": 1.8,
      "n": 20,
      "value": 6.276837754001707
    },
    {
      "group": "Gamma",
      "subgroup": "Category 2",
      "mu": 7.2,
      "sd": 1.8,
      "n": 20,
      "value": 7.0995704215106965
    },
    {
      "group": "Gamma",
      "subgroup": "Category 2",
      "mu": 7.2,
      "sd": 1.8,
      "n": 20,
      "value": 5.829936396388121
    },
    {
      "group": "Gamma",
      "subgroup": "Category 2",
      "mu": 7.2,
      "sd": 1.8,
      "n": 20,
      "value": 11.84533479638041
    },
    {
      "group": "Gamma",
      "subgroup": "Category 2",
      "mu": 7.2,
      "sd": 1.8,
      "n": 20,
      "value": 9.131623710865945
    },
    {
      "group": "Gamma",
      "subgroup": "Category 2",
      "mu": 7.2,
      "sd": 1.8,
      "n": 20,
      "value": 2.780760766362099
    },
    {
      "group": "Gamma",
      "subgroup": "Category 2",
      "mu": 7.2,
      "sd": 1.8,
      "n": 20,
      "value": 4.593263500169485
    },
    {
      "group": "Gamma",
      "subgroup": "Category 2",
      "mu": 7.2,
      "sd": 1.8,
      "n": 20,
      "value": 6.573304806683203
    },
    {
      "group": "Gamma",
      "subgroup": "Category 2",
      "mu": 7.2,
      "sd": 1.8,
      "n": 20,
      "value": 7.3117554012743495
    },
    {
      "group": "Gamma",
      "subgroup": "Category 2",
      "mu": 7.2,
      "sd": 1.8,
      "n": 20,
      "value": 6.815654716217636
    },
    {
      "group": "Gamma",
      "subgroup": "Category 2",
      "mu": 7.2,
      "sd": 1.8,
      "n": 20,
      "value": 5.317433056714767
    },
    {
      "group": "Gamma",
      "subgroup": "Category 2",
      "mu": 7.2,
      "sd": 1.8,
      "n": 20,
      "value": 8.328772022180948
    },
    {
      "group": "Gamma",
      "subgroup": "Category 2",
      "mu": 7.2,
      "sd": 1.8,
      "n": 20,
      "value": 9.112709196384536
    },
    {
      "group": "Gamma",
      "subgroup": "Category 2",
      "mu": 7.2,
      "sd": 1.8,
      "n": 20,
      "value": 8.545484043313682
    },
    {
      "group": "Gamma",
      "subgroup": "Category 2",
      "mu": 7.2,
      "sd": 1.8,
      "n": 20,
      "value": 6.159072772647301
    },
    {
      "group": "Delta",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 3.008579943044308
    },
    {
      "group": "Delta",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 5.203754194582948
    },
    {
      "group": "Delta",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 5.203705843823286
    },
    {
      "group": "Delta",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 3.9840726482861872
    },
    {
      "group": "Delta",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 3.9290937609093124
    },
    {
      "group": "Delta",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 5.332144265273776
    },
    {
      "group": "Delta",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 4.728573215494126
    },
    {
      "group": "Delta",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 4.652111541675142
    },
    {
      "group": "Delta",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 5.0083180294778575
    },
    {
      "group": "Delta",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 5.711963018200012
    },
    {
      "group": "Delta",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 4.741833635463284
    },
    {
      "group": "Delta",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 5.645813824868205
    },
    {
      "group": "Delta",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 5.309067454196644
    },
    {
      "group": "Delta",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 5.689379831516778
    },
    {
      "group": "Delta",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 5.5104112818541395
    },
    {
      "group": "Delta",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 4.198082054048919
    },
    {
      "group": "Delta",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 4.676495197877575
    },
    {
      "group": "Delta",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 5.282867490033308
    },
    {
      "group": "Delta",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 4.227641514736114
    },
    {
      "group": "Delta",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1,
      "n": 20,
      "value": 5.124945686462605
    },
    {
      "group": "Delta",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 1,
      "n": 20,
      "value": 5.570939012979988
    },
    {
      "group": "Delta",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 1,
      "n": 20,
      "value": 5.649203996998297
    },
    {
      "group": "Delta",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 1,
      "n": 20,
      "value": 7.04256017450909
    },
    {
      "group": "Delta",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 1,
      "n": 20,
      "value": 13.1956658286561
    },
    {
      "group": "Delta",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 1,
      "n": 20,
      "value": 5.5297882601036905
    },
    {
      "group": "Delta",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 1,
      "n": 20,
      "value": 5.335190825822309
    },
    {
      "group": "Delta",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 1,
      "n": 20,
      "value": 4.749748993876144
    },
    {
      "group": "Delta",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 1,
      "n": 20,
      "value": 5.2923199231592335
    },
    {
      "group": "Delta",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 1,
      "n": 20,
      "value": 4.374962733214855
    },
    {
      "group": "Delta",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 1,
      "n": 20,
      "value": 5.01522068488565
    },
    {
      "group": "Delta",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 1,
      "n": 20,
      "value": 8.035217008492245
    },
    {
      "group": "Delta",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 1,
      "n": 20,
      "value": 4.670098429265298
    },
    {
      "group": "Delta",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 1,
      "n": 20,
      "value": 6.53416183603425
    },
    {
      "group": "Delta",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 1,
      "n": 20,
      "value": 6.684035033159143
    },
    {
      "group": "Delta",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 1,
      "n": 20,
      "value": 5.8986673863459815
    },
    {
      "group": "Delta",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 1,
      "n": 20,
      "value": 7.471093410603543
    },
    {
      "group": "Delta",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 1,
      "n": 20,
      "value": 5.512116814168929
    },
    {
      "group": "Delta",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 1,
      "n": 20,
      "value": 5.380511459287684
    },
    {
      "group": "Delta",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 1,
      "n": 20,
      "value": 6.30880912424727
    },
    {
      "group": "Delta",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 1,
      "n": 20,
      "value": 5.435635372860274
    },
    {
      "group": "Epsilon",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1.4,
      "n": 20,
      "value": 3.0718914291345403
    },
    {
      "group": "Epsilon",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1.4,
      "n": 20,
      "value": 5.2967149478883035
    },
    {
      "group": "Epsilon",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1.4,
      "n": 20,
      "value": 4.900905301920458
    },
    {
      "group": "Epsilon",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1.4,
      "n": 20,
      "value": 3.525023339036232
    },
    {
      "group": "Epsilon",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1.4,
      "n": 20,
      "value": 3.8769987355404254
    },
    {
      "group": "Epsilon",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1.4,
      "n": 20,
      "value": 5.465990522710615
    },
    {
      "group": "Epsilon",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1.4,
      "n": 20,
      "value": 4.285312597741001
    },
    {
      "group": "Epsilon",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1.4,
      "n": 20,
      "value": 2.800329272324784
    },
    {
      "group": "Epsilon",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1.4,
      "n": 20,
      "value": 4.078029352533362
    },
    {
      "group": "Epsilon",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1.4,
      "n": 20,
      "value": 3.693659581642662
    },
    {
      "group": "Epsilon",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1.4,
      "n": 20,
      "value": 4.431952056693452
    },
    {
      "group": "Epsilon",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1.4,
      "n": 20,
      "value": 6.3272889580001035
    },
    {
      "group": "Epsilon",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1.4,
      "n": 20,
      "value": 6.072448765025415
    },
    {
      "group": "Epsilon",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1.4,
      "n": 20,
      "value": 4.212289853136056
    },
    {
      "group": "Epsilon",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1.4,
      "n": 20,
      "value": 5.172702563349404
    },
    {
      "group": "Epsilon",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1.4,
      "n": 20,
      "value": 3.9823905039480954
    },
    {
      "group": "Epsilon",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1.4,
      "n": 20,
      "value": 5.036034225837117
    },
    {
      "group": "Epsilon",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1.4,
      "n": 20,
      "value": 5.932511051709942
    },
    {
      "group": "Epsilon",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1.4,
      "n": 20,
      "value": 6.807151362147396
    },
    {
      "group": "Epsilon",
      "subgroup": "Category 1",
      "mu": 5,
      "sd": 1.4,
      "n": 20,
      "value": 4.657442059040213
    },
    {
      "group": "Epsilon",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 3,
      "n": 20,
      "value": 2.2928573229186444
    },
    {
      "group": "Epsilon",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 3,
      "n": 20,
      "value": 6.438989872502702
    },
    {
      "group": "Epsilon",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 3,
      "n": 20,
      "value": 7.59148756083197
    },
    {
      "group": "Epsilon",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 3,
      "n": 20,
      "value": 2.8901404012773346
    },
    {
      "group": "Epsilon",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 3,
      "n": 20,
      "value": 8.401404433111326
    },
    {
      "group": "Epsilon",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 3,
      "n": 20,
      "value": 8.053009153869514
    },
    {
      "group": "Epsilon",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 3,
      "n": 20,
      "value": 7.491650639375138
    },
    {
      "group": "Epsilon",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 3,
      "n": 20,
      "value": 3.624174548967209
    },
    {
      "group": "Epsilon",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 3,
      "n": 20,
      "value": 6.879476854727076
    },
    {
      "group": "Epsilon",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 3,
      "n": 20,
      "value": 6.149468262512817
    },
    {
      "group": "Epsilon",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 3,
      "n": 20,
      "value": 4.983521573903115
    },
    {
      "group": "Epsilon",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 3,
      "n": 20,
      "value": 6.603971007716995
    },
    {
      "group": "Epsilon",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 3,
      "n": 20,
      "value": 7.130734900062803
    },
    {
      "group": "Epsilon",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 3,
      "n": 20,
      "value": 9.027452904414435
    },
    {
      "group": "Epsilon",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 3,
      "n": 20,
      "value": 1.4748229124164105
    },
    {
      "group": "Epsilon",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 3,
      "n": 20,
      "value": 1.756062512027591
    },
    {
      "group": "Epsilon",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 3,
      "n": 20,
      "value": 5.034726069564252
    },
    {
      "group": "Epsilon",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 3,
      "n": 20,
      "value": 5.2706690860656735
    },
    {
      "group": "Epsilon",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 3,
      "n": 20,
      "value": 4.217353785896907
    },
    {
      "group": "Epsilon",
      "subgroup": "Category 2",
      "mu": 6,
      "sd": 3,
      "n": 20,
      "value": 4.820673401904755
    }
  ]

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle
        sx={{ m: 0, padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Typography
          sx={{
            color: '#000000E0',
            fontFamily: 'Poppins',
            fontSize: '16px',
            fontWeight: 600,
            lineHeight: '24px',
            textAlign: 'center',
          }}
        >
          Box Plot
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            padding: 0,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            gap: '24px',
          }}
        >
          <Box sx={{
            minHeight: "600px",
            height: "600px",
            width: "100%",
            borderRadius: "4px",
            overflow: 'hidden'
          }}>
            <BoxPlotChart 
              data={data}  
              colors={(boxPlotData) => {
                if (boxPlotData.subGroup === 'Category 1') {
                  return '#1890FF';
                } else if (boxPlotData.subGroup === 'Category 2') {
                  return '#2FC25B';
                }
              }} 
            />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

BoxPlotModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BoxPlotModal